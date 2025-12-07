// 若需要存取 exam-db, 必須經過這層 api

interface UniConfig { // uni config 型別宣告
	name: string,
	shortName: string,
	yearList: Array<string>
}

interface DbConfig { // db config 型別宣告
	uniList: Array<string>,
	uniConfigs: Record<DbConfig["uniList"][number], UniConfig> // 這個 K 只是表達一定要在 uniList 內, 對編譯無影響
}

import _raw_dbConfig from "../exam-db/config.json" with { type: "json" };
import tagTree from "../exam-db/tag-tree.json" with { type: "json" };

const DB_PATH = "../exam-db"; // db 相對於 exam-db.ts 的位置
export const dbConfig = _raw_dbConfig as DbConfig; // 檢查 db config 型態, 如果報錯代表格式錯誤

export function getUniShortName(uni: string): string { // 將 uni (學校英文縮寫) 轉為中文縮寫
	if (uni in dbConfig.uniConfigs) return dbConfig.uniConfigs[uni].shortName;
	return "?"; // 若 key uni 不存在, 回傳 "?"
}


// read exam & decode

// class TagTree
// error tag check

// errors
