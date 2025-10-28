import json, os, re
from pathlib import Path

def readRawExamText(path: Path) -> None: # 讀取 LLM 解析完成的題本字串
	with open(path, "r", encoding="utf-8") as f: rawExamText = f.read() # 讀檔
	
	problemLineArrs = []
	for problemText in rawExamText.split("\n\n"): # 用 \n\n 切分不同的題目
		if problemText == "": continue # 忽略過多的換行
		
		problemText = re.sub(r'\\\( | \\\)|\\\(|\\\)', '$', problemText) # "\( ... \)" 轉 "$ ... $"
		problemText = re.sub(r'\\\[ | \\\]|\\\[|\\\]', '$$', problemText) # "\[ ... \]" 轉 "$$ ... $$"
		problemText = problemText.replace("\u3000", "\u0020") # 全形空白轉半形
		lineArr = [text.strip("\r\n\t\u3000\u0020") for text in problemText.split("\n")] # 根據 \n 切分出每一行文字, 並去除頭尾的空白
		problemLineArrs.append(lineArr)
	
	return problemLineArrs

def decodeProblemModeParams(sectionBaseNames: list[str], params: list[str]) -> dict[str]: # 解碼多選題設定
	problemMultiType = { key: "" for key in sectionBaseNames } # 題目的多選題類型, 空字串代表沒有選項, 大小寫英文字母代表最後一個選項編號
	
	for param in params: # 參數格式為: <最後一個選項編號><題號>, 題號若為 * 會全部設成一樣的多選題結構
		if param[1] == "*":
			problemMultiType = { key: param[0] for key in sectionBaseNames } # 將所有題目都設為一樣的多選題結構
		else:
			if param[1:] in problemMultiType: problemMultiType[param[1:]] = param[0] # 將某一題設成多選題
	
	return problemMultiType

def createExamDirs(uni: str) -> None: # 建立題本資料夾和其子資料夾, 以及 config.json
	os.makedirs(DB_PATH/uni, exist_ok=True)
	os.makedirs(EXAM_PATH, exist_ok=True)
	os.makedirs(EXAM_PATH/"sections", exist_ok=True)
	os.makedirs(EXAM_PATH/"contents", exist_ok=True)

def createExamConfig(sectionBaseNames: list[str]) -> None: # 建立題本設定檔
	examConfig = { # 基礎的 exan config 結構
		"subjectCode": "科目代號",
		"subjectName": "科目全名",
		"subjectShortName": "科目縮寫",
		"department": "系所名稱",
		"externalLink": "題本來源連結",
		"externalLinkTip": "題本來源連結的提示",
		"timeMinutes": 100,
		"isAnswerComplete": False,
		"sectionFileBaseNames": [ # <insert> 區段利用字串不換行的特性, 插入一段不會換行的資料, 提升可讀性
			f"<insert>{ ", ".join(f'"{name}"' for name in sectionBaseNames) }<insert>"
		],
		"problemConfigs": {}
	}
	
	for name in sectionBaseNames: # 新增預設的 problem config
		if name[0] == "-": continue # 若區段名稱開頭是 "-", 沒有 config
		examConfig["problemConfigs"][name] = {
			"answerLatex": "",
			"tags": '<insert>[ "?" ]<insert>',
			"contentConfigs": [ f'<insert>{{ "type": "answer", "fileBaseName": "{name}-ans" }}<insert>' ]
		}
	
	examConfigStr = json.dumps(examConfig, ensure_ascii=False, indent="\t") # py dict 轉 json str, 並以 tab 縮排
	examConfigStr = examConfigStr.replace('"<insert>', "").replace('<insert>"', "") # 移除 <insert> 標籤
	examConfigStr = examConfigStr.replace('\\"', '"')
	
	with open(EXAM_PATH/"config.json", "w", encoding="utf-8") as f: f.write(examConfigStr) # 建立題本設定檔

def createNonProblemVueFile(sectionName: str, sectionLineArr: list[str]) -> None: # 建立一個非題目區塊的 vue 檔 (例如題本的說明區塊)
	textArr = [
		"<template>",
		'\t<span class="ran-app-font">',
		*[ "\t\t"+line for line in sectionLineArr ], # 插入 section 的內容
		"\t</span>",
		"</template>"
	]
	
	with open(EXAM_PATH/"sections"/f"{sectionName}.vue", "w", encoding="utf-8") as f: # 新增 vue 檔
		f.write("\n".join(textArr) + "\n")

def createProblemVueFile(sectionName: str, sectionLineArr: list[str], problemMode: str) -> None: # 建立一個題目區塊的 vue 檔
	listIndex = [] # 多選題編號
	if problemMode.islower(): listIndex = [chr(i) for i in range(ord("a"), ord(problemMode)+1)]
	elif problemMode.isupper(): listIndex = [chr(i) for i in range(ord("A"), ord(problemMode)+1)]
	elif problemMode.isdigit(): listIndex = [str(i) for i in range(1, int(problemMode)+1)]
	
	textArr = [
		"<template>",
		f"\t<MakeProblem{ f' listEndLabel="{problemMode}"' if problemMode != "" else "" }>", # 如果有多選題, 需要加這個參數
		'\t\t<template #problem>',
		*[ "\t\t\t"+line for line in sectionLineArr ], # 插入 section 的內容
		"\t\t</template>",
		*[ f"\t\t<template #{index}></template>" for index in listIndex ], # 插入多選題結構
		"\t</MakeProblem>",
		"</template>"
	]
	
	with open(EXAM_PATH/"sections"/f"{sectionName}.vue", "w", encoding="utf-8") as f: # 新增 vue 檔
		f.write("\n".join(textArr) + "\n")

def createAnswerVueFile(sectionName: str) -> None:
	textArr = [
		"<template>",
		'\t<vk>',
		f"\t\t第 {sectionName} 題的答案",
		"\t</vk>",
		"</template>"
	]
	
	with open(EXAM_PATH/"contents"/f"{sectionName}.vue", "w", encoding="utf-8") as f: # 新增 vue 檔
		f.write("\n".join(textArr) + "\n")

def createAllVueFile( # 建立所有區塊 vue 檔 (sections 資料夾下)
	sectionBaseNames: list[str],
	sectionLineArrs: list[list[str]],
	problemModes: dict[str]
) -> None:
	if len(sectionBaseNames) != len(sectionLineArrs):
		print("[ERROR] Number of section base names != Raw exam text split number")
		return
	
	for i, name in enumerate(sectionBaseNames):
		if name[0] == "-":
			createNonProblemVueFile(name, sectionLineArrs[i]) # 區塊編號開頭為 "-" 會被視為非題目區塊
		else:
			createProblemVueFile(name, sectionLineArrs[i], problemModes[name]) # 建立題目區塊檔
			createAnswerVueFile(name) # 建立詳解區塊檔

print("\033c", end="") # clear console
uni = input("學校英文縮寫: ")
year = input("題本年份: ")
sectionBaseNames = [x for x in input("數個區塊名稱 (用空白鍵分隔): ").split(" ") if x != ""]
problemModeParams = [x for x in input("有哪些題號需要幫忙加入多選題結構 (用空白鍵分隔): ").split(" ") if x != ""]
input("沒有回滾機制，按任意鍵開始建立題本資料夾。")

SRC_PATH = Path(__file__).parent.parent # 路徑 src
DB_PATH = SRC_PATH/"exam-db" # database 絕對路徑
EXAM_PATH = SRC_PATH/"exam-db"/uni/year # 題本資料夾的絕對路徑

createExamDirs(uni)
createExamConfig(sectionBaseNames)
problemModes = decodeProblemModeParams(sectionBaseNames, problemModeParams)
sectionLineArrs = readRawExamText(SRC_PATH/"exam-db-tool"/"raw-exam-text.txt")
createAllVueFile(sectionBaseNames, sectionLineArrs, problemModes)
