import json
from pathlib import Path

SRC_PATH = Path(__file__).parent.parent # 路徑 src

def create_empty_type_stat() -> dict:
	return { "number": 0, "line": 0, "sizeByte": 0 }

def get_stat(path: Path, only=[]) -> dict: # 遞迴計算某個路徑下的所有檔案的統計資料
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

all_stat = {}
for dir in SRC_PATH.iterdir(): all_stat[dir.name] = get_stat(SRC_PATH/dir.name)
all_stat["docs"] = get_stat(SRC_PATH.parent/"docs", only=[".md", ".png", ".webp"]) # docs 只統計 md/png

with open(SRC_PATH/"stat"/"code-stat.json", "w", encoding="utf-8") as f: # write json
	json.dump(all_stat, f, ensure_ascii=False, indent="\t")
