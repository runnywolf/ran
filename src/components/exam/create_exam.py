import json, os
from pathlib import Path
from rich.table import Table
from rich.console import Console

DIR_PATH = Path(__file__).parent # 路徑 src/components/exam

def main():
	print("\033c", end="") # clear console
	print("題本新增工具, 無回滾機制. (不小心生錯就 git restore)")
	
	with open(DIR_PATH/"config.json", "r", encoding="utf-8") as f: # 讀取學校設定檔
		config = json.load(f)
	
	print_exam_info_table(config) # 輸出目前有哪些學校和題本
	
	uni = input("> 選擇上表的學校代號或新增學校: ")
	if uni in config["uni"]: # 若輸入的學校代碼在 config.uniList 內, 視為新增年份
		year = input("> 新題本的民國年份: ")
		uniData = config["uni"][uni]
		
		if year in uniData["yearList"]:
			print(f'題本 "{uniData["shortName"]} {year}" 已存在')
			return
		
		uniData["yearList"].append(year)
		uniData["yearList"].sort(key=int, reverse=True)
	else: # 若輸入的學校代碼沒有在 config.uniList 內, 視同新增學校
		print("新增學校")
		uniName = input("> 學校的中文全名: ")
		uniShortName = input("> 學校的中文縮寫 (2~3字): ")
		year = input("> 新題本的民國年份: ")
		
		config["uniList"].append(uni)
		config["uni"][uni] = { "name": uniName, "shortName": uniShortName, "yearList": [year] }
	
	exam_config = {
		"id": input("> 題本的科目代號 (非必填): "),
		"subject": input("> 題本的科目，長度建議為 6 個全形字元內 (非必填): "),
		"link": input("> 題本來源的網址 (非必填): "),
		"linkTip": input("> 題本來源的網址的附註 (非必填): "),
		"section": input("> 區塊排列資訊 (檔名請用空格分開): ").split(" ")
	}
	exam_config["problem"] = dict.fromkeys(
		(s for s in exam_config["section"] if s[0] != "-"),
		{ "answerLatex": "", "content": [] }
	)
	
	print()
	input("請再次確認細節是否正確, 按任意鍵開始新增題本...")
	print("題本資料夾和設定檔建立完成 ฅ^⦁w⦁^ฅ ੭")
	print() # 結束後, 多換一行用於分隔
	
	write_main_config(config) # 寫入 exam/config.json (學校設定檔)
	make_exam_dirs_and_config(uni, year, exam_config) # 建立題本資料夾和其子資料夾, 以及 config.json

def print_exam_info_table(config): # 輸出目前有哪些學校和題本
	table = Table()
	for key in ["學校代號", "學校名稱", "歷年題本"]:
		table.add_column(key)
	for uni in config["uniList"]:
		uniData = config["uni"][uni]
		table.add_row(uni, uniData["name"], ", ".join(uniData["yearList"]))
	console = Console()
	console.print(table)

def write_main_config(config): # 寫入 exam/config.json (學校設定檔)
	jsonStr = json.dumps(config, ensure_ascii=False, indent="\t") # 轉 json 格式字串, 使用 tab 縮排
	with open(DIR_PATH/"config.json", "w", encoding="utf-8") as f:
		f.write(jsonStr + "\n") # 尾端加上空白行

def make_exam_dirs_and_config(uni, year, exam_config): # 建立題本資料夾和其子資料夾, 以及 config.json
	EXAM_DIR_PATH = DIR_PATH/f"{uni}/{year}" # 題本資料夾的絕對路徑
	
	new_dir_path = [ uni, EXAM_DIR_PATH, EXAM_DIR_PATH/"content", EXAM_DIR_PATH/"problem" ]
	for dir_path in new_dir_path: # 建立題本資料夾和子資料夾
		os.makedirs(dir_path, exist_ok=True)
	
	s = json.dumps(exam_config, ensure_ascii=False, indent="\t") # 轉 json 格式字串, 使用 tab 縮排
	start, end = s.find("section"), s.find("problem") # 刪除換行的範圍
	s = s[:start] + s[start:end].replace("\n\t\t", " ").replace("\n\t],", " ],") + s[end:] # 使 "section" 內的元素不換行
	
	with open(EXAM_DIR_PATH/"config.json", "w", encoding="utf-8") as f:
		f.write(s + "\n") # 尾端加上空白行
	
	for problem_name in exam_config["section"]:
		with open(EXAM_DIR_PATH/"problem"/f"{problem_name}.vue", "w", encoding="utf-8") as f: # 新增預設的題目 vue 檔
			f.write(f"<template>\n\t第 {problem_name} 題的題目\n</template>\n")

main()
