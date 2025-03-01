<template>
	<div class="ts-grid">
		<div class="column">
			<div class="ts-box is-vertical is-compact sidebar">
				<div class="ts-content is-dense sidebar-setting">
					<label class="ts-switch">
						<input type="checkbox" v-model="isExamModeEnabled" checked />
						<span>測驗模式&nbsp;</span>
						<span
							class="ts-icon is-circle-question-icon"
							data-tooltip="開啟測驗模式後，題本內容會在作答前被隱藏，<br>並且不顯示解答。"
							data-html=true
						></span>
					</label>
				</div>
				<div class="ts-divider"></div>
				<div class="ts-content is-dense">
					<table class="sidebar-table">
						<tbody>
							<tr>
								<td>
									<span class="ts-icon is-school-icon"></span>
								</td>
								<td>
									<div class="column ts-select is-solid is-fluid">
										<select v-model="uni" @change="examData = config[uni].exam[0]">
											<option v-for="(uniData, uniName) in config" :key="uniName" :value="uniName">
												{{ uniData.shortName ? uniData.shortName : '-' }}
											</option>
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<span class="ts-icon is-calendar-icon"></span>
								</td>
								<td>
									<div class="column ts-select is-solid is-fluid">
										<select v-model="examData">
											<option v-for="examData in config[uni].exam"
												:key="examData.year"
												:value="examData"
											>
												{{ examData.year ? examData.year : '-' }}&nbsp;年
											</option>
										</select>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="ts-divider "></div>
				<div class="ts-content is-dense">
					<table class="sidebar-table">
						<tbody>
							<tr>
								<td>
									<span class="ts-icon is-hashtag-icon"></span>
								</td>
								<td>
									<span>{{ examData.id ? examData.id : "-" }}</span>
									<span
										class="ts-icon is-circle-question-icon is-start-spaced"
										data-tooltip="題本編號"
									></span>
								</td>
							</tr>
							<tr>
								<td>
									<span class="ts-icon is-file-icon"></span>
								</td>
								<td>
									{{ examData.subject ? examData.subject : "-" }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="ts-divider"></div>
				<div
					class="ts-content is-dense sidebar-timer"
					:style="{ opacity: isExamModeEnabled ? 1 : 0.4 }"
				><!-- 非測驗模式會禁用計時器 -->
					<div class="ts-wrap is-compact is-middle-aligned">
						<button
							class="ts-button is-small is-icon is-outlined"
							@click="clickToggleButton"
							:disabled="!isExamModeEnabled"
						><!-- 計時器的 開始/暫停 按鈕 -->
							<span v-if="isTimerActive" class="ts-icon is-pause-icon"></span>
							<span v-else class="ts-icon is-play-icon"></span>
						</button>
						<button
							class="ts-button is-small is-icon is-outlined"
							@click="clickResetButton"
							:disabled="!isExamModeEnabled"
						><!-- 計時器的重設按鈕 -->
							<span class="ts-icon is-rotate-left-icon"></span>
						</button>
						<span v-if="remainingSec >= 0" class="sidebar-timer-time"><!-- 剩餘時間 -->
							{{ Math.floor(remainingSec / 60) }}:{{ String(remainingSec % 60).padStart(2, '0') }}
						</span>
						<span v-else class="sidebar-timer-time">0:00</span><!-- 如果剩餘時間 < 0, 顯示 0:00 -->
					</div>
					<div
						class="ts-progress is-tiny sidebar-timer-progress"
						:class="isTimerActive ? 'is-processing' : ''"
					><!-- 剩餘時間的進度條. 如果計時器正在計時, 進度條背景會有動畫 -->
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
				<div class="ts-content is-dense">
					<span class="ts-icon is-link-icon is-end-spaced"></span>
					<a v-if="examData.link"
						class="sidebar-link-text"
						:href="examData.link"
						:data-tooltip="examData.linkTip ? examData.linkTip : '沒有附註任何東西捏 (´･ω･`)'"
						target="_blank"
					>題本來源</a>
					<span v-else>來源未知</span>
				</div>
				<div class="ts-divider"></div>
				<div class="ts-content is-dense">
					<button
						class="ts-button is-outlined is-start-icon"
						@click="clickDownload"
						data-tooltip="暫時想不到要怎麼做 ^=⦁𖥦⦁=^ ੭"
					>
						<span class="ts-icon is-download-icon"></span>下載題本
					</button>
				</div>
			</div>
		</div>
		<div class="column is-fluid">
			<div class="ts-box">
				<exam-paper
					:uni="uni"
					:examData="examData"
					:isProblemVisible="isProblemVisible"
					:examTimeSec="examTimeSec"
					@clickStartExam="clickStartExam"
				></exam-paper>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import config from "@/components/exam/config.json"; // 保存題本資訊的設定檔
import ExamPaper from "../components/exam-view/ExamPaper.vue"; // 考卷的組件 (於 v0.1.0-dev.17 分離)

const uni = ref("ntu"); // 選取的學校
const examData = ref(config[uni.value].exam[0]); // 選取的題本的資料

const isExamModeEnabled = ref(false); // 是否開啟測驗模式, 預設為開啟
const isProblemVisible = ref(!isExamModeEnabled.value); // 是否要顯示題本內容. 注意此變數與 "正在作答" 等價
const isTimerActive = ref(false); // 計時器是否正在計時
const examTimeSec = ref(6000); // 考試時間, 幾乎都是 100 分鐘, 師大 90 分鐘
const remainingSec = ref(examTimeSec.value); // 計時器剩餘的秒數

watch(isExamModeEnabled, (newMode) => { // 當測驗模式被切換時
	resetTimer(); // 重置計時器
	isProblemVisible.value = !newMode; // 如果測驗模式被開啟, 隱藏題本內容, 反之顯示題本內容
});
const clickToggleButton = () => { // 按下計時器的 開始/暫停 按鈕
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

const clickDownload = () => { // 下載題本
	
};
</script>

<style scoped>
.sidebar {
	position: sticky; top: 15px; /* 即使題目區往下移動, 這個 box 也會在原地 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.sidebar-setting {
	padding-bottom: 2px; /* 減少測驗模式與下底線的距離 (7.5px -> 2px) */
}
.sidebar-table > tbody > tr > td:first-child {
	text-align: center; /* 置中 icon */
}
.sidebar-table > tbody > tr:not(:first-child) > td {
	padding-top: 4px; /* select 間的距離 */
}
.sidebar-table > tbody > tr > td:not(:first-child) {
	padding-left: 8px; /* 學校下拉選單跟 icon 的距離 */
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
.sidebar-link-text {
	text-decoration: none; /* 隱藏超連結的底線 */
	color: #44f;
}
.sidebar-link-text:hover {
	color: #f3f;
}
</style>
