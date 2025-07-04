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
			
			<!-- 測驗模式的開關 -->
			<div class="ts-content is-dense sidebar-setting">
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
			
			<!-- 題本資訊的表格 -->
			<div class="ts-content is-dense">
				<ExamInfo
					:uniShortName="config.uni[uni]?.shortName"
					:year="year"
					:subjectId="examConfig.id"
					:subject="examConfig.subject"
				></ExamInfo>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 計時器 -->
			<div
				class="ts-content is-dense sidebar-timer"
				:style="{ opacity: isExamModeEnabled ? 1 : 0.4 }"
			>
				
				<!-- 開始暫停按鈕, 重置按鈕, 剩餘時間 -->
				<div class="ts-wrap is-compact is-middle-aligned">
					
					<!-- 開始暫停按鈕 -->
					<button
						class="ts-button is-small is-icon is-outlined"
						@click="clickToggleButton"
						:disabled="!isExamModeEnabled"
					><!-- 計時器的 開始/暫停 按鈕 -->
						<span v-if="isTimerActive" class="ts-icon is-pause-icon"></span>
						<span v-else class="ts-icon is-play-icon"></span>
					</button>
					
					<!-- 重置按鈕 -->
					<button
						class="ts-button is-small is-icon is-outlined"
						@click="clickResetButton"
						:disabled="!isExamModeEnabled"
					><!-- 計時器的重設按鈕 -->
						<span class="ts-icon is-rotate-left-icon"></span>
					</button>
					
					<!-- 剩餘時間 -->
					<span v-if="remainingSec >= 0" class="sidebar-timer-time"><!-- 剩餘時間 -->
						{{ Math.floor(remainingSec / 60) }}:{{ String(remainingSec % 60).padStart(2, '0') }}
					</span>
					<span v-else class="sidebar-timer-time">0:00</span><!-- 如果剩餘時間 < 0, 顯示 0:00 -->
					
				</div>
				
				<!-- 剩餘時間的進度條. 如果計時器正在計時, 進度條背景會有動畫 -->
				<div
					class="ts-progress is-tiny sidebar-timer-progress"
					:class="isTimerActive ? 'is-processing' : ''"
				>
					<div
						class="bar"
						:style="{
							'--value': 100 * (remainingSec / examTimeSec), // 進度條的 css 參數, 100 代表全滿
							'background-color': (remainingSec / examTimeSec) > 0.1 ? '#9bf' : '#f88' // 時間剩下 10% 時, 進度條會變成紅色
						}"
					></div>
				</div>
				
			</div>
			<div class="ts-divider"></div>
			
			<!-- 題本來源的超連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-link-icon is-end-spaced"></span>
				<RanLink v-if="examConfig.link"
					:to="examConfig.link"
					:tooltip="examConfig.linkTip ?? '沒有附註任何東西捏 (´･ω･`)'"
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
				:uni="uni" :year="year" :examConfig="examConfig"
				:isContentVisible="!isExamModeEnabled"
				:isProblemVisible="isProblemVisible"
				:isExamOver="remainingSec <= 0"
				:examTimeSec="examTimeSec"
				@clickStartExam="clickStartExam"
				@resetTimer="resetTimer"
			></ExamPaper>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { globalStore } from "@/store/global"; // pinia 全域變數
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import ExamPaper from "./comp/ExamPaper.vue"; // 考卷的組件 (於 v0.1.0-dev.17 分離)
import ExamInfo from "./comp/ExamInfo.vue"; // 題本資訊的組件 (於 v0.2.0-dev.4 分離)
import config from "@/components/exam/config.json"; // 保存所有題本資訊的設定檔

const globalVar = globalStore(); // 全域變數

const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器

const uni = ref(undefined); // 學校
const year = ref(undefined); // 年份
const examConfig = ref({}); // 題本設定檔

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

watch(() => route.params.id, async (newExamId) => { // 當路由改變時, 嘗試解碼題本 id
	var idParam = newExamId.split("-"); // 若路由為 exam/ntu-112, 則 id = "ntu-112", 以 "-" 字符拆分 id
	if (idParam.length != 2) { // 如果題本 id 的參數個數不為 2, 視為無效 id, 轉址回題本清單
		handleWrongExamIdFormat(newExamId);
		return;
	}
	const [_uni, _year] = idParam; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const configFile = await import(`../../components/exam/${_uni}/${_year}/config.json`) // 讀取題本設定檔
		.catch(() => handleExamMissing(_uni, _year)); // 若題本設定檔不存在或路徑錯誤, 報錯, 並轉址回題本清單
	if (!configFile) return;
	
	uni.value = _uni;
	year.value = _year;
	examConfig.value = configFile.default; // json -> Object
}, { immediate: true }); // 組件載入時, 做一次
function handleWrongExamIdFormat(wrongExamId) { // 如果題本 id 的參數個數不為 2, 視為無效 id
	console.error(
		`Wrong id format. (exam id: ${wrongExamId})\n`
	);
	router.push("/exam"); // 轉址回題本清單
}
function handleExamMissing(_uni, _year) { // 若題本設定檔不存在或路徑錯誤
	console.error(
		`Exam config is not exist. (exam ${_uni}-${_year})\n`+
		`-> Check if @/components/exam/${_uni}/${_year}/config.json exist?\n`
	);
	router.push("/exam"); // 轉址回題本清單
};

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

let timer = null; // 計時器
const startTimer = () => { // 開始計時
	isTimerActive.value = true;
	timer = setInterval(() => {remainingSec.value--}, 1000); // 每 1000ms 將剩餘秒數 -1
};
const pauseTimer = () => { // 停止計時
	isTimerActive.value = false;
	clearInterval(timer); // 停止計時器
	timer = null; // 初始化
};
const resetTimer = () => { // 重置計時器
	pauseTimer(); // 停止計時
	remainingSec.value = examTimeSec.value // 重設計時器的時間
};
const toggleTimer = () => { // 切換計時器的狀態
	isTimerActive.value ? pauseTimer() : startTimer();
};
watch(remainingSec, (newSec) => { // 如果剩餘時間歸零, 將題目隱藏
	if (newSec <= 0) isProblemVisible.value = false;
});

const clickDownload = () => { // 下載題本
	
};
</script>

<style scoped>
.sidebar-setting {
	padding-bottom: 2px; /* 減少測驗模式與下底線的距離 (7.5px -> 2px) */
}
.sidebar-timer {
	padding: 10px 15px 12px 15px; /* 計時器區塊的 padding 修正 */
}
.sidebar-timer-time {
	margin-top: -3px; /* 把計時器的時間部分往上拉一點 */
}
.sidebar-timer-progress {
	margin-top: 7px; /* 計時器進度條與按鈕的垂直間距 */
	background-color: #999; /* 進度條底色 */
}
</style>
