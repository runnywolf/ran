import dbConfig from "./config.json";
import tagTree from "./tag-tree.json";

export function getUniShortName(uni) { // 將 uni (學校英文縮寫) 轉為中文縮寫
	return dbConfig.uniConfigs?.[uni]?.shortName ?? "?"; // 若 key uni 或 "shortName" 不存在, 或值為空, 回傳 "?"
}

export async function getExamConfig(uni, year) { // 讀取題本設定檔
	return await import(`./${uni}/${year}/config.json`) // 讀取題本設定檔
		.catch(() => { throw new ExamConfigMissingError(uni, year); }) // 若題本設定檔不存在或路徑錯誤
		.then(module => module.default);
}

export async function getAllExamConfigs() { // 讀取所有題本設定檔: Array<{ uni, year, examConfig }>
	return await Promise.all(Object.entries(dbConfig.uniConfigs).flatMap( // 載入所有題本的 config
		([uni, { yearList }]) => yearList.map(
			async year => ({ uni, year, examConfig: await getExamConfig(uni, year) })
		)
	));
}

export async function decodeExamIdAndGetConfig(examId) { // 解碼題本 id, 並讀取題本設定檔
	const examIdParams = examId.split("-"); // 將題本 id "<uni>-<year>" 拆分成 ["<uni>", "<year>"]
	if (examIdParams.length != 2) throw new WrongIdFormatError(examId);
	const [uni, year] = examIdParams; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const examConfig = await getExamConfig(uni, year); // 讀取題本設定檔
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

function _searchTagTree(segments, tagNode = { children: tagTree }) { // 消耗 segments, 回傳遍歷 tag-tree 得到的 node arr 路徑
	if (segments[0] in (tagNode.children ?? {})) { // 若子路徑/子節點存在, 往下搜尋
		const childNode = tagNode.children[segments.shift()];
		return [tagNode, ..._searchTagTree(segments, childNode)];
	}
	return [tagNode];
}

export function getTagTreeSearchPath(tag) { // 回傳遍歷 tag-tree 得到的 Array<{ en, zhtw }>
	const tagNodeArr = _searchTagTree(tag.split("-")); // 根據 "-" 切分 tag, 在 tag-tree 內搜尋 tag 目錄
	return tagNodeArr.slice(1); // [0] 是 root tag node, 沒有資訊
}

export function getFlatTagNodes(prefix = "", tagNode = { children: tagTree }) { // 將 tag-tree.json 扁平化為 Array<{ tag, enTag, zhtwTag }>
	const subTags = prefix ? [{ tag: prefix, enTag: tagNode.en, zhtwTag: tagNode.zhtw }] : []; // 排除遞迴造成的空字串 tag
	Object.entries(tagNode.children ?? {}).forEach(([key, childNode]) => { // 將父 tag node 的 tag 前綴接上所有子目錄的 sub tag
		subTags.push(...getFlatTagNodes(prefix ? `${prefix}-${key}` : key, childNode)); // 防止 "-xxx-xxx" (開頭為 "-")
	});
	return subTags;
}
