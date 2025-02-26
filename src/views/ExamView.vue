<template>
	<div class="ts-grid">
		<div class="column">
			<div class="ts-box is-vertical is-compact sidebar">
				<div class="ts-content is-dense sidebar-setting">
					<label class="ts-switch">
						<input type="checkbox" v-model="examMode" checked />
						<span>測驗模式&nbsp;</span>
						<span class="ts-icon is-circle-question-icon" data-tooltip="開啟測驗模式後，題本內容會在作答前被隱藏，<br>並且不顯示解答。" data-html=true></span>
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
												{{ uniData.shortName }}
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
											<option v-for="examData in config[uni].exam" :key="examData.year" :value="examData">
												{{ examData.year }}&nbsp;年
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
									<span class="ts-icon is-circle-question-icon is-start-spaced" data-tooltip="題本編號"></span>
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
				<div class="ts-content is-dense sidebar-timer">
					<span class="ts-icon is-play-icon is-rounded"></span>
					<span class="ts-icon is-rotate-left-icon is-rounded is-spaced"></span>
					<span>100:00</span><br>
					<div class="ts-progress is-tiny is-processing sidebar-timer-progress">
						<div class="bar" style="--value: 50"></div>
					</div>
				</div>
				<div class="ts-divider"></div>
				<div class="ts-content is-dense">
					<span class="ts-icon is-link-icon is-end-spaced"></span>
					<a
						v-if="examData.link"
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
				<div class="ts-content problem-font exam">
					<template v-for="(problemId, i) in examData.problemCompId">
						<ol v-if="problemId[0] !== '-'" :style="{ 'padding-left': (11+9*problemId.length)+'px' }" :start="problemId">
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
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, shallowRef, watch, defineAsyncComponent } from "vue";
import config from "@/components/exam/config.json"; // 保存題本資訊的設定檔
import NotFoundComp from "@/components/exam/NotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件

const examMode = ref(true); // 是否開啟測驗模式
const uni = ref("ntu"); // 選取的學校
const examData = ref(config[uni.value].exam[0]); // 選取的題本年份的資料
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
.sidebar-timer-progress {
	margin-top: 7px; /* 計時器進度條與按鈕的垂直間距 */
	background-color: #999; /* 進度條底色 */
}
.sidebar-timer-progress > .bar {
	background-color: #9bf; /* 進度條顏色 */
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
</style>
