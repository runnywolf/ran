<template>
	<BodyLayout>
		
		<!-- 左側的資訊板 -->
		<template #sidebar>
			
			<!-- "回題本選單" 的連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-reply-icon is-end-spaced"></span>
				<RanLink to="#/exam">&nbsp;回題本選單</RanLink>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 題本資訊的表格 -->
			<div class="ts-content is-dense">
				<ExamInfo
					:uniShortName="dbConfig.uniConfigs[uni]?.shortName"
					:examYear="year"
					:subjectCode="examConfig.subjectCode"
					:subjectShortName="examConfig.subjectShortName"
				></ExamInfo>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 測驗模式的開關 -->
			<div class="ts-content is-dense sidebar-exam-mode">
				<label class="ts-switch">
					<input type="checkbox" v-model="isExamModeEnabled" />
					<span>測驗模式&nbsp;</span>
					<span
						class="ts-icon is-circle-question-icon"
						data-tooltip="開啟測驗模式後，題本內容會在作答前被隱藏，<br>並且不顯示解答。"
						data-html=true
					></span>
				</label>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 計時器 -->
			<div class="ts-content is-dense sidebar-timer">
				<ExamTimer
					:timeMinutes="examConfig.timeMinutes"
					:isEnabled="isExamModeEnabled"
					@return-timer="timer => examTimer = timer"
					@start="onTimerStart"
					@reset="onTimerReset"
					@timeup="onTimeup"
				></ExamTimer>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 題本來源的超連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-link-icon is-end-spaced"></span>
				<RanLink v-if="examConfig.externalLink"
					:to="examConfig.externalLink"
					:tooltip="examConfig.externalLinkTip ?? '沒有附註任何東西捏 (´･ω･`)'"
				>題本來源</RanLink>
				<span v-else>未知的來源</span>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 下載按鈕 (未實作) -->
			<div class="ts-content is-dense">
				<button
					class="ts-button is-outlined is-start-icon"
					@click="clickDownload"
					data-tooltip="暫時想不到要怎麼做 ฅ^⦁⩊⦁^ฅ ੭"
				>
					<span class="ts-icon is-download-icon"></span>下載題本
				</button>
			</div>
			
		</template>
		
		<!-- 右側的考卷 -->
		<template #content>
			<ExamPaper
				:uni="uni"
				:year="year"
				:examConfig="examConfig"
				:state="examPaperState"
				@click-start-button="clickStartButtonInExamPaper"
				@click-reset-button="clickResetButtonInExamPaper"
			></ExamPaper>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import dbConfig from "@/exam-db/config.json"; // 保存所有題本資訊的設定檔
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import ExamInfo from "./comp/ExamInfo.vue"; // 題本資訊的組件
import ExamTimer from "./comp/ExamTimer.vue"; // 計時器的組件
import ExamPaper from "./comp/ExamPaper.vue"; // 考卷的組件

// #region 路由解碼
const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(); // 題本的學校英文縮寫
const year = ref(); // 題本的民國年份
const examConfig = ref({}); // 題本設定檔

watch(() => route.params.id, async (newExamId) => { // 當路由改變時, 嘗試解碼題本 id
	var idParams = newExamId.split("-"); // 若路由為 exam/ntu-112, 則 id = "ntu-112", 以 "-" 字符拆分 id
	if (idParams.length != 2) { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id, 轉址回題本清單
		handleWrongExamIdFormat(newExamId);
		return; // 提前終止
	}
	const [_uni, _year] = idParams; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const examConfigFile = await import(`../../exam-db/${_uni}/${_year}/config.json`) // 讀取題本設定檔
		.catch(() => handleExamMissing(_uni, _year)) // 若題本設定檔不存在或路徑錯誤, 報錯, 並轉址回題本清單
	if (!examConfigFile) return; // 題本設定檔不存在, 提前終止
	
	uni.value = _uni; // 如果題本設定檔載入成功, 更新學校和年份和題本設定檔
	year.value = _year;
	examConfig.value = examConfigFile.default; // json -> Object
}, { immediate: true }); // 組件載入時, 做一次

function handleWrongExamIdFormat(wrongExamId) { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id
	console.error(`Wrong exam id format "${wrongExamId}".\n`);
	router.push("/exam"); // 轉址回題本清單
}

function handleExamMissing(_uni, _year) { // 若題本設定檔不存在或路徑錯誤
	console.error(
		`Exam config is not exist. (exam "${_uni}-${_year}")\n`+
		`-> Check if src/exam-db/${_uni}/${_year}/config.json exist?\n`
	);
	router.push("/exam"); // 轉址回題本清單
};
// #endregion

const examTimer = ref(null); // 計時器控制器
const isExamModeEnabled = ref(true); // 是否開啟測驗模式, 預設為開啟
const examPaperState = ref(0); // 題本組件的狀態: 0顯示答案, 1作答前, 2正在考試, 3時間結束

watch(examConfig, () => { // 偵測直接改網址造成的路由變化
	examPaperState.value = isExamModeEnabled.value ? 1 : 0; // 當題本改變時, 將題本組件狀態設為 "0顯示答案" 或 "1作答前"
	examTimer.value.reset(); // 重設計時器
});

watch(isExamModeEnabled, newExamMode => {
	examPaperState.value = newExamMode ? 1 : 0; // 當測驗模式改變時, 將題本組件狀態設為 "0顯示答案" 或 "1作答前"
}, { immediate: true });

const onTimerStart = () => { // 當計時器開始計時
	if (examPaperState.value === 1) examPaperState.value = 2; // 題本組件由 "1作答前" 轉為 "2正在考試" 的狀態
};

const onTimerReset = () => { // 當計時器被重置
	if (examPaperState.value !== 0) examPaperState.value = 1; // 除了 "0顯示答案", 強制轉為 "1作答前" 的狀態
};

const onTimeup = () => { // 計時器倒數結束
	if (examPaperState.value === 2) examPaperState.value = 3; // 題本組件由 "2正在考試" 轉為 "3時間結束" 的狀態
};

const clickStartButtonInExamPaper = () => { // 按下右側題本的 "開始作答" 按鈕
	examTimer.value.start(); // 開始計時
};

const clickResetButtonInExamPaper = () => { // 按下右側題本的 "重設計時器" 按鈕
	examTimer.value.reset(); // 重設計時器
};

const clickDownload = () => { // 下載題本
	// todo
};

// ----------------- refactor line -----------------
/*
const FIND_PROBLEM_TIMES = 10; // 最大尋找次數, 如果題目載入太慢就不滾動
const FIND_PROBLEM_PER_MS = 100; // 每次尋找的時間
onMounted(() => { // 元素已掛載至 DOM, 檢查要不要滾動至題目
	if (!globalVar.examScrollProbNo) return; // 題號不存在, 就不滾動
	
	isExamModeEnabled.value = false; // 若需要滾動, 必須關掉測驗模式
	
	let findCount = 0; // 目前的尋找次數
	const intervalId = setInterval(() => {
		findCount++; // 尋找次數 +1
		if (findCount > FIND_PROBLEM_TIMES) clearInterval(intervalId); // 尋找次數達到上限會停止, 不滾動
		const targetOl = document.querySelector(`#exam-paper-p${globalVar.examScrollProbNo}`); // 取得題目的 ol 標籤
		if (!targetOl) return; // 找不到標籤, 重新找
		
		targetOl.scrollIntoView({ behavior: "smooth", block: "start" }); // 滾動至題目
		globalVar.examScrollProbNo = null; // 如果成功滾動, 清除這個值
		clearInterval(intervalId);
	}, FIND_PROBLEM_PER_MS); // 因為題目是動態載入的, 所以每一段時間檢測標籤存不存在
});
*/
</script>

<style scoped>
.sidebar-exam-mode {
	padding-bottom: 2px;
}
.sidebar-timer {
	padding: 10px 15px 12px 15px; /* 計時器區塊的 padding 修正 */
}
</style>
