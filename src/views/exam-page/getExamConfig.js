import { showToast, ToastType } from "toast";

export async function decodeExamIdAndGetConfig(examId, router) { // 解碼題本 id, 並讀取題本設定檔
	const examIdParams = examId.split("-"); // 將題本 id "<uni>-<year>" 拆分成 ["<uni>", "<year>"]
	if (examIdParams.length != 2) {
		handleWrongExamIdFormat(examId, router); // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id, 轉址回題本清單
		return { uni: null, year: null, examConfig: {} };
	}
	const [uni, year] = examIdParams; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const examConfig = await import(`../../exam-db/${uni}/${year}/config.json`) // 讀取題本設定檔
		.catch(() => handleExamMissing(uni, year, router)) // 若題本設定檔不存在或路徑錯誤, 報錯, 並轉址回題本清單
		.then(module => module.default);
	
	if (!examConfig) return { uni, year, examConfig: {} }; // 題本設定檔不存在
	return { uni, year, examConfig };
}

function handleWrongExamIdFormat(examId, router) { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id
	console.error(`Wrong exam id format "${examId}".\n`);
	showToast("題本編號的形式錯誤", ToastType.WARNING);
	router.push("/exam"); // 轉址回題本清單
}

function handleExamMissing(uni, year, router) { // 若題本設定檔不存在或路徑錯誤
	console.error(
		`Exam config is not exist. (exam "${uni}-${year}")\n`+
		`-> Check if src/exam-db/${uni}/${year}/config.json exist?\n`
	);
	showToast(`題本 ${uni}-${year} 不存在`, ToastType.ERROR);
	router.push("/exam"); // 轉址回題本清單
}
