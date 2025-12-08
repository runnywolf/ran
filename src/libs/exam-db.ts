// 若需要存取 exam-db, 必須經過這層 api

interface DbConfig { // db config 型別宣告
	uniList: Array<string>,
	uniConfigs: Record<string, UniConfig>, // 這個 K 只是表達一定要在 uniList 內, 對編譯無影響
}

interface UniConfig { // uni config 型別宣告
	name: string, // 學校中文全名
	shortName: string, // 學校中文縮寫, 建議為 2 ~ 3 個字的全形中文
	yearList: Array<string>, // 目前有哪些年份
}

interface ExamConfig { // exam config 型別宣告
	subjectCode: string, // 科目代號，同年每一份考卷的編號都不一樣
	subjectName: string, // 題本的科目的完整名稱
	subjectShortName: string, // 題本的科目縮寫
	department: string, // 這份題本是考哪一個科系
	externalLink: string, // 題本的來源連結
	externalLinkTip: string, // 題本的來源連結的說明 (游標 hover 時會顯示)
	timeMinutes: number, // 題本的作答時間 (分鐘)，除了師大 90 min 以外，其他好像都是 100 min。
	isAnswerComplete: boolean, // 如果這份題本的所有詳解是完整的，改成 true
	sectionFileBaseNames: Array<string>, // 多個區塊名稱
	problemConfigs: Record<string, ProblemConfig>, // key 為題號儲存的 problem config
}

interface ProblemConfig { // problem config 型別宣告
	hideProblemNo?: boolean, // 是否顯示題號 (若這個 key 不存在就是不顯示)
	answerLatex: string | Array<string>, // 題目的答案，若為 array<string> 會變成由上而下多行顯示。
	tags: Array<string>, // 題目的多個標籤
	contentConfigs: Array<ContentConfig>, // 數個內容設定
}

interface ContentConfig { // content config 型別宣告
	type: string, // 內容區塊類型
	fileBaseName: string, // 內容區塊在資料夾 src/exam-db/<uni>/<year>/contents/ 內的路徑
	suffix?: string, // 後綴, only for 詳解類型的內容區塊
}

import c from "../exam-db/nycu/114/config.json" // [debug]
const cc = c as ExamConfig; // [debug]

import _dbConfig from "../exam-db/config.json" with { type: "json" };
import tagTree from "../exam-db/tag-tree.json" with { type: "json" };

const DB_PATH = "../exam-db"; // db 相對於 exam-db.ts 的位置
export const dbConfig = _dbConfig as DbConfig; // 檢查 db config 型態, 如果報錯代表格式錯誤

export function getUniShortName(uni: string) { // 將 uni (學校英文縮寫) 轉為中文縮寫
	if (uni in dbConfig.uniConfigs) return dbConfig.uniConfigs[uni].shortName;
	return "?"; // 若 key uni 不存在, 回傳 "?"
}

export async function getExamConfig(uni: string, year: string): Promise<ExamConfig> { // 讀取並回傳題本設定檔
	return await import(`${DB_PATH}/${uni}/${year}/config.json`) // 讀取題本設定檔
		.catch(() => { throw new ExamConfigMissingError(uni, year); }) // 若題本設定檔不存在
		.then(module => module.default as ExamConfig);
}

export async function getAllExamConfigs(): Promise<Array<{ uni: string; year: string; examConfig: ExamConfig }>> { // 讀取所有題本設定檔
	return Promise.all(Object.entries(dbConfig.uniConfigs).flatMap( // 載入所有題本的 config
		([ uni, { yearList } ]) => yearList.map(
			async year => ({ uni, year, examConfig: await getExamConfig(uni, year) })
		)
	));
}



// read exam & decode

// class TagTree
// error tag check

export class ExamConfigMissingError extends Error { // 若題本設定檔不存在
	constructor(public uni: string, public year: string) {
		super(
			`[examLoader] Exam config is not exist. (exam "${uni}-${year}")\n`+
			`-> Check if src/exam-db/${uni}/${year}/config.json exist?\n`
		);
	}
}
