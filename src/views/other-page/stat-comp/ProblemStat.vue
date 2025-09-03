<template>
	
	<div class="ts-text is-big is-bold" style="margin-top: -6px; margin-bottom: 6px;">
		題目統計
		<span
			class="ts-icon is-circle-exclamation-icon is-start-spaced"
			:data-tooltip="'以下的標籤集合可能有包含關係，並非互斥。\n請不要拿這份資料預測未來考題。'"
		></span>
	</div>
	
	<div class="ts-text" style="margin-bottom: 8px;">
		已收錄 {{ stat.examNumber }} 題本，其中 {{ stat.answerCompleteExamNumber }}
		份有完整詳解 ({{ (stat.answerCompleteExamNumber / stat.examNumber * 100).toFixed(2) }}%)。<br>
		總共收錄 {{ stat.problemNumber }} 題，其中 {{ stat.problemHasAnswerNumber }}
		題有答案 ({{ (stat.problemHasAnswerNumber / stat.problemNumber * 100).toFixed(2) }}%)。
	</div>
	
	<div class="ts-box is-collapsed">
		<table class="ts-table is-collapsed stat-table">
			<thead>
				<tr>
					<th>標籤</th><th>題目數</th><th>占比</th><th>學校出題數</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="{ tag, count, percent, uniCounts } in tagDatas">
					<td>
						<Tag :tag="tag" clickToSearch></Tag>
					</td>
					<td>{{ count }}</td>
					<td>{{ percent }}%</td>
					<td>
						<span v-for="[uni, uniCount] in uniCounts">
							{{ getUniShortName(uni) }}{{ uniCount }}&nbsp;&nbsp;&nbsp;
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	
</template>

<script setup>
import { getUniShortName } from "@/exam-db/examLoader.js"; // 讀取題本資料
import { sum } from "ran-math";
import stat from "@/stat/problem-stat.json"; // 統計資料
import Tag from "@/components/problem/Tag.vue"; // tag 組件

const tagDatas = Object.entries(stat.tagsNumber).map(([tag, uniCountsDict]) => { // 轉 arr: { tag, 總題數, 比例, 各學校題數 }
	const tagCount = sum(Object.values(uniCountsDict));
	return {
		tag,
		count: tagCount,
		percent: (tagCount / stat.problemNumber * 100).toFixed(2),
		uniCounts: Object.entries(uniCountsDict).filter(([_, uniCount]) => uniCount > 0) // 只顯示題數 > 0 的學校
			.sort((a, b) => b[1]-a[1]) // 根據題數降序排列
	};
});
</script>

<style scoped>
.stat-table > tbody > tr > :nth-child(2), :nth-child(3) { /* "題目數" 和 "占比" 的值因為是數字, 所以靠右排列 */
	text-align: right;
}
.stat-table tr > :nth-child(1) { /* 減少 "標籤" 與 "題目數" 的間距 */
	padding-right: 0;
}
.stat-table tr > :nth-child(2) { /* 減少 "標籤" 與 "題目數" 的間距 */
	padding-left: 0;
}
</style>
