<template>
	<div class="ts-grid">
		<div class="column">
			<div class="ts-box is-vertical is-compact sidebar">
				<div class="ts-content is-dense sidebar-setting">
					<label class="ts-switch">
						<input type="checkbox" checked />
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
											<option v-for="(value, name) in config" :key="name" :value="name">
												{{ value.shortName }}
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
											<option v-for="(item, index) in config[uni].exam" :key="item.year" :value="item">
												{{ item.year }}&nbsp;年
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
									{{ examData.id ? examData.id : "-" }}&nbsp;
									<span class="ts-icon is-circle-question-icon" data-tooltip="題本編號"></span>
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
					<span class="ts-icon is-print-icon is-end-spaced"></span>列印題本
				</div>
			</div>
		</div>
		<div class="column is-fluid">
			<div class="ts-box">
				<div class="ts-content -font-test">
					
					<component :is="ExamComponent"></component>
					
					
					<div class="ts-divider is-section"></div>
					2. (10%) Whichknow N is an infinite set. Let S = {k/2" | n = 0,1,2,...; k ∈ N}. Note that

/ in this question is the division of real numbers. For example, 5/2 = 2.5.

Prove that S is an infinite set strictly according to your definition of an infi-
					solves<br>
					<vue-latex expression="a_n = -a_{n-1} + 6a_{n-2}"></vue-latex>
					know N is an infinite set. Let S = {k/2" | n = 0,1,2,...; k ∈ N}. Note that

/ in this question is the division of real numbers. For example, 5/2 = 2.5.

Prove that S is an infinite set strictly according to your definition of an infi-
					<vue-latex expression="\frac{a_i}{1+x}" displayMode></vue-latex>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import config from "@/components/exam/config.json";

const uni = ref("ntu"); // 選取的學校
const examData = ref(config[uni.value].exam[0]); // 選取的題本資料








import { VueLatex } from "vatex";

import { defineAsyncComponent } from 'vue';
const ExamComponent = defineAsyncComponent(() => import("@/components/exam/ntu/112/1.vue"));

</script>

<style scoped>
.-font-test {
	font-family: "Times New Roman", Times, serif;
	font-size: 18px; /* 字體大小 */
	letter-spacing: 0.02em; /* 字母之間的距離 */
	word-spacing: 0.06em; /* 單詞之間空白的距離 */
	line-height: 1.2em; /* 行距 (倍) */
}
</style>
<style scoped>
.sidebar {
	position: sticky; top: 16px; /* 即使題目區往下移動, 這個 box 也會在原地 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.sidebar .ts-icon:not(.is-rounded) {
	color: #59f; /* 除了計時器按鈕以外的 icon 的顏色 */
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
</style>
