import dbConfig from "./config.json";
import tagMap from "./tag-map.json";

export function getUniShortName(uni) { // 將 uni (學校英文縮寫) 轉為中文縮寫
	return dbConfig.uniConfigs?.[uni]?.shortName ?? "?"; // 若 key uni 或 "shortName" 不存在, 或值為空, 回傳 "?"
}

export async function decodeExamIdAndGetConfig(examId) { // 解碼題本 id, 並讀取題本設定檔
	const examIdParams = examId.split("-"); // 將題本 id "<uni>-<year>" 拆分成 ["<uni>", "<year>"]
	if (examIdParams.length != 2) throw new WrongIdFormatError(examId);
	const [uni, year] = examIdParams; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const examConfig = await import(`./${uni}/${year}/config.json`) // 讀取題本設定檔
		.catch(() => { throw new ExamConfigMissingError(uni, year); }) // 若題本設定檔不存在或路徑錯誤
		.then(module => module.default);
	
	return { uni, year, examConfig };
}

export async function decodeExamIdAndGetProblemConfig(examId, no) { // 解碼題本 id, 並讀取題本設定檔內的某一個 problem config
	const { uni, year, examConfig } = await decodeExamIdAndGetConfig(examId); // 讀取題本設定檔
	
	if (no in examConfig.problemConfigs) {
		return { uni, year, no, problemConfig: examConfig.problemConfigs[no] };
	} else { // 題號不存在
		throw new ProblemConfigMissingError(uni, year, no);
	}
}

export class WrongIdFormatError extends Error { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id
	constructor(examId) {
		super(`[examLoader] Wrong exam id format "${examId}".\n`);
	}
}

export class ExamConfigMissingError extends Error { // 若題本設定檔不存在或路徑錯誤
	constructor(uni, year) {
		super(
			`[examLoader] Exam config is not exist. (exam "${uni}-${year}")\n`+
			`-> Check if src/exam-db/${uni}/${year}/config.json exist?\n`
		);
		this.uni = uni;
		this.year = year;
	}
}

export class ProblemConfigMissingError extends Error { // 題號不存在
	constructor(uni, year, no) {
		super(`[examLoader] Problem ${no} is not exist. (exam "${uni}-${year}")".\n`);
		this.uni = uni;
		this.year = year;
		this.no = no;
	}
}
