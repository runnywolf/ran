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
				<ExamInfo :uniShortName="getUniShortName(uni)" :examYear="year" :examConfig="examConfig">
				</ExamInfo>
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
			
			<!-- 下載按鈕 (未實作) -->
			<div class="ts-content is-dense">
				<button class="ts-button is-outlined is-start-icon" @click="clickDownload">
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
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showToast, ToastType } from "toast";
import { getUniShortName, decodeExamIdAndGetConfig } from "@/exam-db/examLoader.js"; // 讀取題本資料
import { WrongIdFormatError, ExamConfigMissingError } from "@/exam-db/examLoader.js"; // error
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import ExamInfo from "./exam-comp/ExamInfo.vue"; // 題本資訊的組件
import ExamTimer from "./exam-comp/ExamTimer.vue"; // 計時器的組件
import ExamPaper from "./exam-comp/ExamPaper.vue"; // 考卷的組件

// #region 路由解碼
const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(); // 題本的學校英文縮寫
const year = ref(); // 題本的民國年份
const examConfig = ref({}); // 題本設定檔

watch(() => route.params.id, async (newExamId) => { // 當路由改變時, 嘗試解碼題本 id
	try {
		const examData = await decodeExamIdAndGetConfig(newExamId); // 讀取題本設定檔
		uni.value = examData.uni; // 如果題本設定檔載入成功, 更新學校和年份和題本設定檔
		year.value = examData.year;
		examConfig.value = examData.examConfig;
	} catch (err) {
		if (err instanceof WrongIdFormatError) { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id
			showToast("題本編號的形式錯誤", ToastType.WARNING);
		} else if (err instanceof ExamConfigMissingError) { // 若題本設定檔不存在或路徑錯誤
			showToast(`題本 ${err.uni}-${err.year} 不存在`, ToastType.ERROR);
		}
		console.error(err.message); // 在 console 報錯
		router.push("/exam"); // 轉址回題本清單
	}
}, { immediate: true }); // 組件載入時, 做一次
// #endregion

// #region 點擊 ProblemView 的題本連結, 滾動至某一題
const FIND_PROBLEM_TIMES = 20; // 最大尋找次數, 如果題目載入太慢就不滾動
const FIND_PROBLEM_EVERY_MS = 100; // 每次尋找的時間 (ms)

onMounted(() => { // dom 元素掛載好時, 嘗試滾動
	const scrollTargetNo = sessionStorage.getItem("scroll-target-no-in-exam-view"); // 要滾動到的題號
	if (!scrollTargetNo) return; // 沒有要滾動
	
	sessionStorage.removeItem("scroll-target-no-in-exam-view"); // 消耗掉這個值
	isExamModeEnabled.value = false; // 若需要滾動, 必須關掉測驗模式
	
	let findCount = 0; // 目前的尋找次數
	const intervalId = setInterval(() => {
		findCount++; // 尋找次數 +1
		if (findCount > FIND_PROBLEM_TIMES) clearInterval(intervalId); // 尋找次數達到上限會停止, 不滾動
		
		const targetOl = document.querySelector(`#exam-paper-problem-${scrollTargetNo}`); // 取得題目的 ol 標籤
		if (!targetOl) return; // 找不到標籤, 重新找
		
		targetOl.scrollIntoView({ behavior: "smooth", block: "start" }); // 滾動至題目
		clearInterval(intervalId); // 停止尋找
	}, FIND_PROBLEM_EVERY_MS); // 因為題目是動態載入的, 所以每一段時間檢測標籤存不存在
});
// #endregion

// #region 控制考試狀態
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
// #endregion

const clickDownload = () => { // 下載題本
	showToast("此功能未實作 ฅ^⦁⩊⦁^ฅ ੭", ToastType.ERROR);
	// 也許之後可以切分出一個用於下載的 comp
};
</script>

<style scoped>
.sidebar-exam-mode {
	padding-bottom: 2px;
}
.sidebar-timer {
	padding: 10px 15px 12px 15px; /* 計時器區塊的 padding 修正 */
}
</style>
