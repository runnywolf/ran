# 這個工具會產生 "src/exam-db/search-data.json"
# 擷取所有題目的純文字並打包成單一 json, 避免上千個 problem vue file request, 便於題目搜尋

import json, re
from pathlib import Path

SRC_PATH = Path(__file__).parent.parent # 路徑 src
DB_PATH = SRC_PATH/"exam-db" # database 絕對路徑

def problemVueFileToInnerText(uni: str, year: str, no: str) -> str: # 題目 vue 檔轉 html inner text
	with open(DB_PATH/uni/year/"sections"/f"{no}.vue", "r", encoding="utf-8") as f:
		text = f.read()
	
	text = text.split("<template>", 1)[1].rsplit("</template>", 1)[0] # 擷取 vue file 的 temp 部分 (題目文字內容)
	text = re.sub(r"<[^>]+>", "", text) # 移除 <...> 標籤
	lines = [l.strip() for l in text.splitlines()] # 去除 innerText 的頭尾空白, tab 等等
	text = " ".join(l for l in lines if len(l) > 0) # 將非空字串以空白符連接
	return text.lower() # 轉小寫, 僅用於輔助搜尋

with open(DB_PATH/"config.json", "r", encoding="utf-8") as f: # 讀取 db config
	dbConfig = json.load(f)

searchData = []
for uni, uni_config in dbConfig["uniConfigs"].items(): # 讀取每一年的題本
	for year in uni_config["yearList"]: # 讀取每份題本
		with open(DB_PATH/uni/year/"config.json", "r", encoding="utf-8") as f: # 讀取題本設定檔
			examConfig = json.load(f)
			for no, problemConfig in examConfig["problemConfigs"].items(): # 讀取題本設定檔的每一個題目設定
				searchData.append({
					"uni": uni, "year": year, "no": no, "problemConfig": problemConfig,
					"problemText": problemVueFileToInnerText(uni, year, no) # 題目 vue 檔轉 html inner text
				})

with open(DB_PATH/"search-data.json", "w", encoding="utf-8") as f:
	json.dump(searchData, f)

print("[Finish] ฅ^⦁⩊⦁^ฅ ੭")
