import json
from pathlib import Path

SRC_PATH = Path(__file__).parent.parent # 路徑 src

def create_empty_type_stat() -> dict:
	return { "number": 0, "line": 0, "sizeByte": 0 }

def get_code_stat(path: Path, only=[]) -> dict: # 遞迴計算某個路徑下的所有檔案的統計資料
	all_files = [ path ] if path.is_file() else path.rglob("*")
	if len(only) > 0: all_files = [f for f in all_files if f.suffix in only]
	
	stat = {}
	for f in all_files: # 遍歷路徑下的所有檔案
		if not f.is_file(): continue # 跳過不是檔案的東西
		
		file_type = f.suffix.lstrip(".") # 檔案類型
		if file_type not in stat: stat[file_type] = create_empty_type_stat() # 如果某個檔案類型沒有統計資料, 新增一個
		type_stat = stat[file_type] # 某個檔案類型的統計
		
		type_stat["number"] += 1 # 檔案數
		type_stat["sizeByte"] += f.stat().st_size # 檔案大小 (Byte)
		
		try:
			with f.open("r", encoding="utf-8") as file:
				file_text = file.read()
				type_stat["line"] += len([l for l in file_text.split("\n") if l.strip()]) # 行數, 忽略空白行
		except Exception as e:
			pass
	
	return stat

def make_code_stat_json() -> None: # 生成程式碼的統計
	all_stat = {}
	for dir in SRC_PATH.iterdir(): all_stat[dir.name] = get_code_stat(SRC_PATH/dir.name)
	all_stat["docs"] = get_code_stat(SRC_PATH.parent/"docs", only=[".md", ".png", ".webp"]) # docs 只統計 md/png

	with open(SRC_PATH/"stat"/"code-stat.json", "w", encoding="utf-8") as f: # write json
		json.dump(all_stat, f, ensure_ascii=False, indent="\t")

def update_problem_stat(stat: dict, exam_config: dict) -> None: # 根據 problem stat 的參考, 更新 stat 的值
	stat["examNumber"] += 1
	stat["answerCompleteExamNumber"] += 1 if exam_config["isAnswerComplete"] else 0
	stat["problemNumber"] += len(exam_config["problemConfigs"])
	stat["problemHasAnswerNumber"] += sum(
		1 if len(problem_config["answerLatex"]) > 0 else 0 for problem_config in exam_config["problemConfigs"].values()
	)
	
	for problem_config in exam_config["problemConfigs"].values():
		if "tags" not in problem_config: continue # 如果某個 problem config 內的 key "tags" 沒有被添加, 代表這題沒標籤, skip
		
		for tag in problem_config["tags"]: # 遍歷所有 tag
			if tag not in stat["tagsNumber"]: stat["tagsNumber"][tag] = 0 # 如果 tag 沒在 dict 裡, 新建一個
			stat["tagsNumber"][tag] += 1 # 計數器 +1

def make_problem_stat_json() -> None: # 生成題目的統計
	with open(SRC_PATH/"exam-db"/"config.json", "r", encoding="utf-8") as f: # 讀取 db config
		db_config = json.load(f)
	
	stat = {
		"examNumber": 0, # 題本數
		"answerCompleteExamNumber": 0, # 完整詳解的題本數
		"problemNumber": 0, # 題目數
		"problemHasAnswerNumber": 0, # 有答案的題目數
		"tagsNumber": {}, # 標籤數
	}
	for uni, uni_config in db_config["uniConfigs"].items():
		for year in uni_config["yearList"]: # 讀取每份題本
			with open(SRC_PATH/"exam-db"/uni/year/"config.json", "r", encoding="utf-8") as f: # 讀取題本設定檔
				update_problem_stat(stat, json.load(f)) # 更新 stat
	
	with open(SRC_PATH/"stat"/"problem-stat.json", "w", encoding="utf-8") as f: # write json
		json.dump(stat, f, ensure_ascii=False, indent="\t")

make_code_stat_json() # 生成程式碼的統計
make_problem_stat_json() # 生成題目的統計
