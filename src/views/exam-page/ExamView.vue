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
					@returnTimer="timer => examTimer = timer"
					@timeup="console.log('time up!')"
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
			<!--ExamPaper
				:uni="uni" :year="year" :examConfig="examConfig"
				:isContentVisible="!isExamModeEnabled"
				:isProblemVisible="isProblemVisible"
				:isExamOver="remainingSec <= 0"
				:examTimeSec="examTimeSec"
				@clickStartExam="clickStartExam"
				@resetTimer="resetTimer"
			></ExamPaper-->
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

const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(); // 學校英文縮寫
const year = ref(); // 題本民國年份
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

const examTimer = ref(null); // 計時器控制器
const isExamModeEnabled = ref(true); // 是否開啟測驗模式, 預設為開啟

const clickDownload = () => { // 下載題本
	
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

const isExamModeEnabled = ref(true); // 是否開啟測驗模式, 預設為關閉
const isProblemVisible = ref(!isExamModeEnabled.value); // 是否要顯示題本內容
const isTimerActive = ref(false); // 計時器是否正在計時
const examTimeSec = ref(6000); // 考試時間, 幾乎都是 100 分鐘, 師大 90 分鐘
const remainingSec = ref(examTimeSec.value); // 計時器剩餘的秒數

watch(isExamModeEnabled, (newMode) => { // 當測驗模式被切換時
	resetTimer(); // 重置計時器
	isProblemVisible.value = !newMode; // 如果測驗模式被開啟, 隱藏題本內容, 反之顯示題本內容
});
watch(examConfig, () => { // 當題本被切換
	if (isExamModeEnabled.value) clickResetButton(); // 若在測驗模式下, 等同於按下重設計時器
});
const clickToggleButton = () => { // 按下計時器的 開始/暫停 按鈕
	if (remainingSec.value <= 0) return;
	toggleTimer(); // 切換計時器的狀態
	if (!isProblemVisible.value) isProblemVisible.value = true; // 如果題目被隱藏(還沒開始考試), 則顯示題目
};
const clickResetButton = () => { // 按下重設計時器的按鈕
	resetTimer(); // 重設計時器
	isProblemVisible.value = false; // 隱藏題目
};
const clickStartExam = () => { // 按下開始作答的按鈕
	resetTimer(); // 重設計時器
	startTimer(); // 開始計時
	isProblemVisible.value = true; // 顯示題目
};

watch(remainingSec, (newSec) => { // 如果剩餘時間歸零, 將題目隱藏
	if (newSec <= 0) isProblemVisible.value = false;
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
