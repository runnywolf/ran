import json, os, re
from pathlib import Path

def split_raw_exam_text(exam_text: str) -> list[str]: # 切分並處理 llm 輸出的題本字串
	problem_text_arr = []
	for prob_text in exam_text.split("\n\n"):
		score_text = ""
		if "@@" in prob_text:
			[score_text, prob_text] = prob_text.split("@@", maxsplit=1)
			score_text = score_text.split(" ", maxsplit=1)[1]
		else:
			prob_text = prob_text.split(" ", maxsplit=1)[1]
		
		prob_text = repr(prob_text.strip()).replace("\\\\", "\\") # 去除頭尾的空白\n\t
		prob_text = prob_text.replace("\\n", "\n\t\t\t\t") # 換行自動縮排
		prob_text = re.sub(r'\\\( | \\\)|\\\(|\\\)', '$', prob_text) # "\( ... \)" 轉 "$ ... $"
		prob_text = re.sub(r'\\\[ | \\\]|\\\[|\\\]', '$$', prob_text) # "\[ ... \]" 轉 "$$ ... $$"
		prob_text = prob_text.lstrip("'").rstrip("'")
		
		problem_text_arr.append([score_text, prob_text])
	
	return problem_text_arr

def create_exam_dirs(uni: str) -> None: # 建立題本資料夾和其子資料夾, 以及 config.json
	os.makedirs(DB_PATH/uni, exist_ok=True)
	os.makedirs(EXAM_PATH, exist_ok=True)
	os.makedirs(EXAM_PATH/"sections", exist_ok=True)
	os.makedirs(EXAM_PATH/"contents", exist_ok=True)

def create_exam_config(section_base_names: list[str]) -> None: # 建立題本設定檔
	with open(SRC_PATH/"exam-db-tool"/"exam-config-temp.json", "r", encoding="utf-8") as f: # 讀取 config 的模板
		config_temp_str = f.read()
	
	section_base_names_str = ", ".join(f'"{name}"' for name in section_base_names)
	config_temp_str = config_temp_str.replace( # 填寫區塊檔名
		'"sectionFileBaseNames": []', f'"sectionFileBaseNames": [ {section_base_names_str} ]',
	)
	
	content_config_str = lambda no: f'{{ "type": "answer", "fileBaseName": "{no}-ans" }}'
	problem_config = lambda no: { "answerLatex": "", "contentConfigs": [ f"@CONTENT_CONFIG_{no}@" ] }
	problem_configs = { no: problem_config(no) for no in section_base_names if no[0] != "-" } # 說明區塊開頭是 "-", 沒有 config
	problem_configs = { "problemConfigs": problem_configs }
	problem_configs_str = json.dumps(problem_configs, ensure_ascii=False, indent="\t") # 多個題目設定的 json str
	problem_configs_str = problem_configs_str.lstrip("{\n\t").rstrip("\n}") + "}"
	for no in section_base_names:
		problem_configs_str = problem_configs_str.replace(f'"@CONTENT_CONFIG_{no}@"', content_config_str(no))
	config_temp_str = config_temp_str.replace('"problemConfigs": {}', problem_configs_str)
	
	with open(EXAM_PATH/"config.json", "w", encoding="utf-8") as f: # 建立題本設定檔
		f.write(config_temp_str)

def create_vue_files(section_base_names: list[str]) -> None:
	with open(SRC_PATH/"exam-db-tool"/"basic-temp.vue", "r", encoding="utf-8") as f: # 讀取題目 vue 檔的預設模板
		basic_temp_str = f.read()
	with open(SRC_PATH/"exam-db-tool"/"problem-temp.vue", "r", encoding="utf-8") as f: # 讀取題目 vue 檔的預設模板
		answer_temp_str = f.read()
	
	with open(SRC_PATH/"exam-db-tool"/"raw-exam-text.txt", "r", encoding="utf-8") as f:
		raw_exam_text = f.read()
	arr_raw_exam_text_splited = split_raw_exam_text(raw_exam_text)
	
	for i, base_name in enumerate(section_base_names):
		if base_name[0] == "-":
			with open(EXAM_PATH/"sections"/f"{base_name}.vue", "w", encoding="utf-8") as f: # 新增預設的題目 vue 檔
				f.write(basic_temp_str.replace("@INSERT_BASIC_TEMP@", f"題本的說明區塊 {base_name}"))
		else:
			with open(EXAM_PATH/"sections"/f"{base_name}.vue", "w", encoding="utf-8") as f: # 新增預設的題目 vue 檔
				[score_text, prob_text] = arr_raw_exam_text_splited[i]
				f.write(answer_temp_str.replace("@SCORE_TEXT@", score_text).replace("@INSERT_PROBLEM_TEMP@", prob_text))
			with open(EXAM_PATH/"contents"/f"{base_name}-ans.vue", "w", encoding="utf-8") as f: # 新增預設的解答 vue 檔
				f.write(basic_temp_str.replace("@INSERT_BASIC_TEMP@", f"第 {base_name} 題的解答"))

print("\033c", end="") # clear console
uni = input("學校英文縮寫: ")
year = input("題本年份: ")
section_base_names = [x for x in input("數個區塊名稱 (用空白鍵分隔): ").split(" ") if x != ""]
input("沒有回滾機制，按任意鍵開始建立題本資料夾。")

SRC_PATH = Path(__file__).parent.parent # 路徑 src
DB_PATH = SRC_PATH/"exam-db" # database 絕對路徑
EXAM_PATH = SRC_PATH/"exam-db"/uni/year # 題本資料夾的絕對路徑

create_exam_dirs(uni)
create_exam_config(section_base_names)
create_vue_files(section_base_names)

input("建立完成。")
