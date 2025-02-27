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
							@click="toggleTimer"
							:disabled="!isExamModeEnabled"
						><!-- 計時器的 開始/暫停 按鈕 -->
							<span v-if="isTimerActive" class="ts-icon is-pause-icon"></span>
							<span v-else class="ts-icon is-play-icon"></span>
						</button>
						<button
							class="ts-button is-small is-icon is-outlined"
							@click="resetTimer"
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
						:class="isExamModeEnabled && isProblemVisible ? 'is-processing' : ''"
					><!-- 剩餘時間的進度條. 如果正在進行測驗(題目顯示中), 進度條背景會有動畫 -->
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
					<span class="ts-icon is-print-icon is-end-spaced"></span>
					<span>列印題本</span>
				</div>
			</div>
		</div>
		<div class="column is-fluid">
			<div class="ts-box">
				<div
					class="ts-content problem-font exam"
					:style="{ filter: 'blur('+ (isProblemVisible ? 0 : 10) +'px)'}"
				><!-- 模糊化題本 -->
					<template v-for="(problemId, i) in examData.problemCompId">
						<ol v-if="problemId[0] !== '-'"
							:style="{ 'padding-left': (11+9*problemId.length)+'px' }"
							:start="problemId"
						>
							<li><!-- ol: 根據題目編號的長度修正 ol 的 padding-left -->
								<component :is="problemAsyncComp[i]"></component>
							</li>
						</ol>
						<div v-else><!-- 題號開頭若為 '-', 會隱藏題號 -->
							<component :is="problemAsyncComp[i]"></component>
						</div>
						<div v-if="i != examData.problemCompId.length - 1" class="ts-divider is-section"></div><!-- 題目間的分隔線 -->
					</template>
				</div>
				<div v-if="!isProblemVisible" class="ts-wrap is-vertical is-middle-aligned exam-ready"><!-- 開始作答的 ui, 覆蓋於模糊的題目之上 -->
					<div class="ts-text is-huge is-bold"><!-- 題本年份 -->
						{{ config[uni].shortName }}&nbsp;&nbsp;{{ examData.year }}
					</div>
					<div class="ts-list is-unordered"><!-- 考試建議 -->
						<div class="item">
							快速看過全部題目後再開始作答，考試時間為 {{ Math.floor(examTimeSec / 60) }} 分鐘，請做好配速。
						</div>
						<div class="item">如果有給手寫答案紙，且題本沒有附註「只寫答案即可」，建議附上運算過程。</div>
						<div class="item">簡單題目請先做完，若時間夠，驗算一遍後再做剩餘題目。</div>
					</div>
					<button class="ts-button is-start-icon" @click="startExam">
						<span class="ts-icon is-pen-icon"></span>
						開始作答
					</button>
					<div class="ts-text is-small is-secondary is-italic">
						如果你只想翻閱一下歷屆試題，可以關閉左側選單中的「測驗模式」
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, shallowRef, watch, defineAsyncComponent } from "vue";
import config from "@/components/exam/config.json"; // 保存題本資訊的設定檔
import NotFoundComp from "@/components/exam/NotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件

const uni = ref("ntu"); // 選取的學校
const examData = ref(config[uni.value].exam[0]); // 選取的題本的資料
const problemAsyncComp = shallowRef([]); // 目前顯示的題目組件. shallowRef 只有 .value 改變時更新元素
const loadProblemComp = (id) => defineAsyncComponent( // 異步載入編號為 id 的題目組件
	() => import(`../components/exam/${uni.value}/${examData.value.year}/${id}.vue`) // 載入題目組件
		.catch(() => NotFoundComp) // 題目組件載入失敗時, 顯示錯誤訊息組件
);
watch(examData, async (newExamData) => { // 如果選取的題本年份改變了, 要做的事
	problemAsyncComp.value = await Promise.all( // 並行載入所有題目組件
		newExamData.problemCompId.map(loadProblemComp) // 異步載入所有題目
	);
}, { immediate: true }); // 頁面載入時, 載入一次題目

const isExamModeEnabled = ref(true); // 是否開啟測驗模式, 預設為開啟
const isTimerActive = ref(false); // 計時器是否正在計時
const examTimeSec = ref(6000); // 考試時間, 幾乎都是 100 分鐘, 師大 90 分鐘
const remainingSec = ref(examTimeSec.value); // 計時器剩餘的秒數
const isProblemVisible = ref(false); // 是否要顯示題本內容. 注意此變數與 "正在作答" 等價
watch(isExamModeEnabled, (newMode) => { // 當測驗模式被切換時
	resetTimer(); // 重置計時器
	isProblemVisible.value = !newMode; // 如果測驗模式被開啟, 隱藏題本內容, 反之顯示題本內容
});
const toggleTimer = () => { // 按下計時器的 開始/暫停 按鈕
	console.log("timer toggle");
};
const resetTimer = () => { // 按下計時器的重設按鈕
	console.log("timer reset");
};
const startExam = () => { // 按下開始作答的按鈕
	resetTimer(); // 重設計時器
	isProblemVisible.value = true; // 顯示題目
}
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
.exam > ol {
	padding-left: 20px; /* 題目編號與 box 左側邊緣的距離 */
}
.exam > ol > li {
	padding-left: 4px; /* 題目編號與題目的距離 */
}
.exam-ready { /* 開始作答的 ui, 覆蓋於模糊的題目之上 */
	position: absolute; /* 絕對定位 */
	top: 100px; /* 與考卷頂部的距離 */
	left: 50%; /* 水平置中 */
	transform: translate(-50%, 0); /* 調整 x 座標讓其水平置中 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
</style>
