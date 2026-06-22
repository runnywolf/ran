import json
from pathlib import Path
from typing import Self

SRC_PATH = Path(__file__).parent.parent # src
RAN_PATH = SRC_PATH.parent # 專案的路徑
DB_PATH = SRC_PATH/"exam-db" # src/exam-db

class CodeStat: # 程式碼的統計資料
	def __init__(self, path: Path, only=[]) -> Self:
		all_files = [ path ] if path.is_file() else path.rglob("*") # 如果 path 是資料夾, 把資料夾下的檔案路徑找出來
		if (len(only) > 0): all_files = [f for f in all_files if f.suffix in only] # 篩選特定附檔名
		
		stat = {}
		for f in all_files: # 遍歷路徑下的所有檔案
			if not f.is_file(): continue # 跳過不是檔案的東西
			
			file_type = f.suffix.lstrip(".") # 檔案類型
			if file_type not in stat:
				stat[file_type] = { "number": 0, "line": 0, "sizeByte": 0 } # 如果某個檔案類型沒有統計資料, 新增一個
			type_stat = stat[file_type] # 某個檔案類型的統計
			
			type_stat["number"] += 1 # 檔案數
			type_stat["sizeByte"] += f.stat().st_size # 檔案大小 (Byte)
			
			try:
				with f.open("r", encoding="utf-8") as file:
					file_text = file.read()
					type_stat["line"] += len([l for l in file_text.split("\n") if l.strip()]) # 行數, 忽略空白行
			except Exception as e: # 圖片沒有行數, 無視它
				pass
		
		self.stat = stat # key 為附檔名, value 為 { number, line, sizeByte }
	
	def merge(self, code_stat: Self) -> Self: # 合併兩個統計資料
		for suffix, suffix_stat in code_stat.stat.items():
			if suffix in self.stat: # 如果 self 已經有某個副檔名的資料, 加總
				for k in ["number", "line", "sizeByte"]: self.stat[suffix][k] += suffix_stat[k]
			else: # 如果 self 沒有某個副檔名的資料, 複製過去
				self.stat[suffix] = suffix_stat
		
		return self # chaining
	
	def to_stat(self) -> dict:
		return self.stat

def make_code_stat() -> None: # 生成程式碼的統計
	code_stat_app = CodeStat(RAN_PATH/"index.html") # app 範圍的統計
	for i in ["components", "libs", "router", "styles", "views", "App.vue", "main.js"]:
		code_stat_app.merge(CodeStat(SRC_PATH/i))
	
	stat = {
		"app": code_stat_app.to_stat(),
		"exam": CodeStat(DB_PATH, only=[".webp", ".vue", ".json"]).to_stat(),
		"test": CodeStat(SRC_PATH/"tests").to_stat(),
		"docs": CodeStat(RAN_PATH/"docs", only=[".md", ".png", ".webp"]).to_stat(),
		"tool": CodeStat(SRC_PATH/"exam-db-tool").merge(CodeStat(SRC_PATH/"stat"/"make-stat.py")).to_stat()
	}
	
	with open(SRC_PATH/"stat"/"code-stat.json", "w", encoding="utf-8") as f: # write json
		json.dump(stat, f, ensure_ascii=False, separators=(",", ":"))

class TagStat: # 單個標籤的統計資料
	def __init__(self, tag: str, uni_list: list[str]): # 輸入 tag name 和所有學校的縮寫
		self.tag = tag
		self.uni_list = uni_list # 有序的學校縮寫, 用於將無序的 uni_count 轉為有序
		self.uni_count = dict.fromkeys(uni_list, 0) # 某個學校有出現過這個標籤的題目數
	
	def is_parent_of(self, tag: str) -> bool: # 判斷 self.tag 是否為 tag 的父標籤
		splited_tag = tag.split("-")
		splited_subtag = self.tag.split("-")
		if len(splited_subtag) > len(splited_tag): return False # 如果 subtag 深度 > tag 的深度, 那一定不是子標籤
		return all(x == y for x, y in zip(splited_tag, splited_subtag)) # 有一層不同, 那一定不是子標籤
	
	def update(self, uni: str, problem_config: dict) -> None: # 用一個 problem config 更新這個標籤的統計資料
		if "tags" not in problem_config: return # 如果某個 problem config 內的 key "tags" 沒有被添加, 代表這題沒標籤, skip
		if any(self.is_parent_of(tag) for tag in problem_config["tags"]): # 題目存在至少一個 tag 的子字串在 tag-tree 中
			self.uni_count[uni] += 1 # 將該 tag 的學校計數 +1
	
	def to_str(self) -> str: # 轉為字串, 用於寫入 problem-stat.txt
		return str(self.tag) + "".join(f",{self.uni_count[uni]}" for uni in self.uni_list)

def get_flat_tags(prefix="", tag_node={}) -> list[str]: # 將 tag-tree.json 前序遍歷扁平化為 tag arr
	sub_tags = [prefix] if prefix else [] # 排除遞迴造成的空字串 tag
	
	for key, child_node in tag_node.get("children", {}).items():
		new_prefix = f"{prefix}-{key}" if prefix else key # 防止 "-xxx-xxx" (開頭為 "-")
		sub_tags.extend(get_flat_tags(new_prefix, child_node)) # 將父 tag node 的 tag 前綴接上所有子目錄的 sub tag
	
	return sub_tags

def make_problem_stat() -> None: # 生成題目的統計
	with open(SRC_PATH/"exam-db"/"config.json", "r", encoding="utf-8") as f: # 讀取 db config
		db_config = json.load(f)
	
	with open(SRC_PATH/"exam-db"/"tag-tree.json", "r", encoding="utf-8") as f: # 讀取標籤樹
		tag_tree = json.load(f)
		flat_tags = get_flat_tags(tag_node={ "children": tag_tree })
	
	main_stat = {
		"examNumber": 0, # 題本數
		"answerCompleteExamNumber": 0, # 完整詳解的題本數
		"problemNumber": 0, # 題目數
		"problemHasAnswerNumber": 0 # 有答案的題目數
	}
	tag_stats = [TagStat(tag, db_config["uniList"]) for tag in flat_tags] # 每個標籤的統計資訊
	
	for uni, uni_config in db_config["uniConfigs"].items(): # 遍歷所有學校
		for year in uni_config["yearList"]: # 遍歷一個學校的不同年份的所有題本
			with open(SRC_PATH/"exam-db"/uni/year/"config.json", "r", encoding="utf-8") as f: # 讀取題本設定檔
				exam_config = json.load(f)
			
			main_stat["examNumber"] += 1
			main_stat["answerCompleteExamNumber"] += 1 if exam_config["isAnswerComplete"] else 0
			main_stat["problemNumber"] += len(exam_config["problemConfigs"])
			
			for no, problem_config in exam_config["problemConfigs"].items(): # 遍歷一個題本內的所有題目
				if len(problem_config["answerLatex"]) > 0: main_stat["problemHasAnswerNumber"] += 1
				
				if "tags" not in problem_config: # 如果某個 problem config 沒有 tags 欄位
					print(f'[{uni}-{year}/{no}] Key "tags" not found in problem config.')
					continue
				
				if len(problem_config["tags"]) == 0: # 如果某個 problem config 沒有任何 tag (make-exam-v2.py 會生成一個預設 tag "?")
					print(f'[{uni}-{year}/{no}] Value of "tags" is empty.')
				
				for tag in problem_config["tags"]: # 檢查所有 tag 是否在 tag tree 內 (合法 tag)
					if tag not in flat_tags: print(f'[{uni}-{year}/{no}] Tag "{tag}" is invalid.')
				
				for tag_stat in tag_stats: tag_stat.update(uni, problem_config) # 用一個題本內的所有題目, 更新這個標籤的統計資料
	
	with open(SRC_PATH/"stat"/"problem-stat.txt", "w", encoding="utf-8") as f: # write txt
		f.write(json.dumps(main_stat, ensure_ascii=False, separators=(",", ":")))
		for tag_stat in tag_stats: f.write("\n" + tag_stat.to_str())

make_code_stat() # 生成程式碼的統計
make_problem_stat() # 生成題目的統計

print("[Finish] ฅ^⦁⩊⦁^ฅ ੭")
