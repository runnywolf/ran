// 若需要存取 exam-db, 必須經過這層 api

export interface DbConfig { // db config 型別宣告
	uniList: Array<string>,
	uniConfigs: Record<string, UniConfig>, // 這個 K 只是表達一定要在 uniList 內, 對編譯無影響
}

export interface UniConfig { // uni config 型別宣告
	name: string, // 學校中文全名
	shortName: string, // 學校中文縮寫, 建議為 2 ~ 3 個字的全形中文
	yearList: Array<string>, // 目前有哪些年份
}

export interface ExamConfig { // exam config 型別宣告
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

export interface ProblemConfig { // problem config 型別宣告
	hideProblemNo?: boolean, // 是否顯示題號 (若這個 key 不存在就是不顯示)
	answerLatex: string | Array<string>, // 題目的答案，若為 array<string> 會變成由上而下多行顯示。
	tags: Array<string>, // 題目的多個標籤
	contentConfigs: Array<ContentConfig>, // 數個內容設定
}

export interface ContentConfig { // content config 型別宣告
	type: "default" | "answer", // 內容區塊類型
	fileBaseName: string, // 內容區塊在資料夾 src/exam-db/<uni>/<year>/contents/ 內的路徑
	suffix?: string, // 後綴, only for 詳解類型的內容區塊
}

export interface ProblemSearchData { // 單個題目的資訊 (用於搜尋題目)
	uni: string, // 學校縮寫
	year: string, // 題本年份
	no: string, // 題號
	problemConfig: ProblemConfig, // 題目設定檔
	problemText: string, // 題目 vue 檔內 template 區塊裡擷取出來的 html inner text, 請參考 src/exam-db-tool/make-search-data.py
}

export interface TagNode { // tag node 型別宣告
	en: string, // tag 的英文
	zhtw: string, // tag 的中文
	children?: Record<string, TagNode>, // 子節點
}

import type { Component } from "vue";
import _dbConfig from "../exam-db/config.json" with { type: "json" };
import _searchData from "../exam-db/search-data.json" with { type: "json" };
import _tagTree from "../exam-db/tag-tree.json" with { type: "json" };

export const dbConfig = _dbConfig as DbConfig; // 檢查 db config 型態, 如果報錯代表格式錯誤
const tagTree = _tagTree as Record<string, TagNode>; // 檢查 tag tree 型態
const tagTreeRootNode = { children: tagTree } as TagNode;

export function getUniShortName(uni: string): string { // 將 uni (學校英文縮寫) 轉為中文縮寫
	if (uni in dbConfig.uniConfigs) return dbConfig.uniConfigs[uni].shortName;
	return "?"; // 若 key uni 不存在, 回傳 "?" (等待載入的空值處理)
}

export function decodeExamId(examId: string): { uni: string, year: string } { // 將題本 id "<uni>-<year>" 轉為 { uni, year }
	const examIdParams = examId.split("-"); // 將題本 id "<uni>-<year>" 拆分成 ["<uni>", "<year>"]
	if (examIdParams.length != 2) throw new WrongIdFormatError(examId); // 參數只能 2 個
	return { uni: examIdParams[0], year: examIdParams[1] }; // 題本 id 的第 0 個參數為 uni, 第 1 個參數為 year
}

export async function getExamConfig(uni: string, year: string): Promise<ExamConfig> { // 讀取並回傳題本設定檔
	return await import(`../exam-db/${uni}/${year}/config.json`) // 讀取題本設定檔
		.catch(() => { throw new ExamConfigMissingError(uni, year); }) // 若題本設定檔不存在
		.then(module => module.default as ExamConfig);
}

export async function getProblemConfig(uni: string, year: string, no: string): Promise<ProblemConfig> { // 讀取並回傳題目設定
	const examConfig = await getExamConfig(uni, year); // 讀取題本設定檔
	if (no in examConfig.problemConfigs) return examConfig.problemConfigs[no]; // 如果題號存在, 回傳題目設定
	throw new ProblemConfigMissingError(uni, year, no); // 如果題號不存在, 報錯
}

export async function getPrevAndNextNo( // 取得某一個題號的前後題號
	uni: string, year: string, no: string
): Promise<[string | undefined, string | undefined]> {
	const examConfig = await getExamConfig(uni, year); // 讀取題本設定檔
	const problemNoList = examConfig.sectionFileBaseNames.filter(_no => _no[0] !== "-"); // 題本的題號 (必須有序), 忽略 "-" 開頭的說明區塊
	const noIndex = problemNoList.indexOf(no); // 題號的順序
	if (noIndex === -1) return [undefined, undefined]; // 若題號不存在
	return [problemNoList[noIndex-1], problemNoList[noIndex+1]]; // 回傳前後題號, 注意: 如果前後題號不存在, 可能回傳類似 [undefined, "2"] 的東西
}

export async function getSectionComp( // 讀取並回傳區塊(題目)組件
	uni: string, year: string, no: string
): Promise<{ default: Component }> {
	return import(`../exam-db/${uni}/${year}/sections/${no}.vue`)
		.catch(() => { throw new SectionCompMissingError(uni, year, no); }) // 若區塊組件不存在或路徑錯誤
}

export function getAllContentComps( // 讀取並回傳多個內容(解答)組件
	uni: string, year: string, no: string, problemConfig: ProblemConfig
): Array<Promise<{ default: Component }>> {
	const contentConfigs = problemConfig.contentConfigs; // 題目的內容區塊的設定
	if (!contentConfigs || contentConfigs.length === 0) { // 在 problem config 內, 存放內容組件的 "contentConfigs": [...] 不存在或空
		throw new ContentsEmptyError(uni, year, no);
	}
	return contentConfigs.map(
		({ fileBaseName }) => import(`../exam-db/${uni}/${year}/contents/${fileBaseName}.vue`) // 讀取解答組件
			.catch(() => { throw new ContentCompMissingError(uni, year, no, fileBaseName); })
	);
}

export async function getSearchData(): Promise<Array<ProblemSearchData>> { // 因為 search-data.json 很大, 所以採用動態載入
	return await import("../exam-db/search-data.json") // 讀取 search data
		.then(module => module.default as Array<ProblemSearchData>); // 確認型態
}

export class ProblemSaver { // 收藏題目專用
	static decodeProblemId(id: string): { uni: string, year: string, no: string } { // 解碼型式為 "<uni>-<year>/<no>" 的題目唯一 id
		const [ examId, no ] = id.split("/"); // -> [ "<uni>-<year>", "<no>" ]
		const { uni, year } = decodeExamId(examId); // 解碼題本 id
		return { uni, year, no };
	}
	
	static getSavedProblemIds(): Array<string> { // 從 local storage 讀取所有已收藏的題目 id
		try {
			const raw = localStorage.getItem("saved-problem-ids");
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	}
	
	static setState(uni: string, year: string, no: string, state: boolean): void { // 設定題目的收藏狀態
		let savedProblemIds = ProblemSaver.getSavedProblemIds(); // 從 local storage 讀取所有已收藏的題目 id
		const problemId = `${uni}-${year}/${no}`;
		
		if (state && !savedProblemIds.includes(problemId)) savedProblemIds.push(problemId);
		if (!state) savedProblemIds = savedProblemIds.filter(id => id !== problemId);
		
		localStorage.setItem("saved-problem-ids", JSON.stringify(savedProblemIds));
	}
	
	static getState(uni: string, year: string, no: string): boolean { // 讀取題目的收藏狀態
		const savedProblemIds = ProblemSaver.getSavedProblemIds(); // 從 local storage 讀取所有已收藏的題目 id
		return savedProblemIds.includes(`${uni}-${year}/${no}`);
	}
	
	static getAllDecodedProblemId(): Array<{ uni: string, year: string, no: string }> {
		const savedProblemIds = ProblemSaver.getSavedProblemIds(); // 從 local storage 讀取所有已收藏的題目 id
		return savedProblemIds.map(id => ProblemSaver.decodeProblemId(id));
	}
}

export class TagTree {
	static getPathToNode(tag: string): Array<{ en: string, zhtw: string }> { // 將一個 tag 字串依照 "-" 字符切分後, 回傳 tag tree 搜尋路徑
		const path = []; // 搜尋路徑
		let tagNode = tagTreeRootNode; // root node
		for (const seg of tag.split("-")) {
			if (!(tagNode.children && seg in tagNode.children)) throw new TagMismatchError(path, tag, seg); // tag 不在 tag tree 內
			tagNode = tagNode.children[seg]; // 繼續搜尋子節點
			path.push({ en: tagNode.en, zhtw: tagNode.zhtw }); // 紀錄搜尋路徑
		}
		return path;
	}
	
	static getFlattenedNodes( // 將 tag tree 扁平化
		prefix = "", tagNode = tagTreeRootNode
	): Array<{ tag: string, en: string, zhtw: string }> {
		const subTags = prefix ? [{ tag: prefix, en: tagNode.en, zhtw: tagNode.zhtw }] : []; // 排除遞迴造成的空字串 tag
		Object.entries(tagNode.children ?? {}).forEach(([key, childNode]) => { // 將父 tag node 的 tag 前綴接上所有子目錄的 sub tag
			subTags.push(...TagTree.getFlattenedNodes(prefix ? `${prefix}-${key}` : key, childNode)); // 防止 "-xxx-xxx" (開頭為 "-")
		});
		return subTags;
	}
}

function getErrorSectionMessage(uni: string, year: string, no: string) { // 錯誤發生在哪一題的訊息
	return `(section ${no} in exam ${uni}-${year})`;
}

function getErrorConfigPath(uni: string, year: string) { // 有錯的設定檔路徑
	return `src/exam-db/${uni}/${year}/config.json`;
}

export class WrongIdFormatError extends Error { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id
	constructor(examId: string) {
		super(`[exam-db.ts] Wrong exam id format "${examId}".\n`);
	}
}

export class ExamConfigMissingError extends Error { // 若題本設定檔不存在
	constructor(public uni: string, public year: string) {
		super(
			`[exam-db.ts] Exam config is not exist. (exam "${uni}-${year}")\n`+
			`-> Check if ${getErrorConfigPath(uni, year)} exist?\n`
		);
	}
}

export class ProblemConfigMissingError extends Error { // 若題目設定不存在
	constructor(public uni: string, public year: string, public no: string) {
		super(
			`[exam-db.ts] Problem ${no} config is not exist. (exam "${uni}-${year}")\n`+
			`-> Check if problemConfigs.${no}: {...} in ${getErrorConfigPath(uni, year)} ?`
		);
	}
}

export class SectionCompMissingError extends Error { // 區塊(題目)組件不存在
	constructor(uni: string, year: string, no: string) {
		super(
			`[exam-db.ts] Section comp is not exist. ${getErrorSectionMessage(uni, year, no)}\n`+
			`-> Check if src/exam-db/${uni}/${year}/sections/${no}.vue exist?\n`+
			`-> If ${no}.vue exist, check the "${no}" is in sectionFileBaseNames: [...]`+
			` in ${getErrorConfigPath(uni, year)}`
		);
	}
}

export class ContentsEmptyError extends Error { // 在 problem config 內, 存放內容組件的 "contentConfigs": [...] 不存在或空
	constructor(uni: string, year: string, no: string) {
		super(
			`[exam-db.ts] Problem contents is undefined or empty. ${getErrorSectionMessage(uni, year, no)}\n`+
			`-> Add "contentConfigs": [ { "type": ?, "id": ? }, ... ] in `+
			`problemConfigs.${no}: {...} in ${getErrorConfigPath(uni, year)}`
		);
	}
}

export class ContentCompMissingError extends Error { // 內容(解答)組件不存在
	constructor(uni: string, year: string, no: string, contentFileName: string) {
		super(
			`[exam-db.ts] Content comp is not exist. ${getErrorSectionMessage(uni, year, no)}\n`+
			`-> Check if src/exam-db/${uni}/${year}/contents/${contentFileName}.vue exist?\n`+
			`-> If ${contentFileName}.vue exist, check the elements in `+
			`problemConfigs.${no}.contentConfigs: [...] in ${getErrorConfigPath(uni, year)} , `+
			`and one of element.fileBaseName must be "${contentFileName}".`
		);
	}
}

export class TagMismatchError extends Error { // tag 的某個 segment 無法在 tag tree 中找到子節點
	constructor(public path: Array<{ en: string, zhtw: string }>, tag: string, mismatchSegment: string) {
		const validSubtag = tag.split(mismatchSegment, 2)[0]; // tag 前半部份合法的子標籤 (將 tag 的 mismatchSegment 之後的部分刪除)
		super(`[exam-db.ts] Tag segment mismatch: ${validSubtag ?? ""}"${mismatchSegment}"`);
	}
}
