<template>
	<div class="ts-text is-big is-bold" style="margin-top: -6px; margin-bottom: 6px;">
		題目統計
		<span
			class="ts-icon is-circle-exclamation-icon is-start-spaced"
			data-tooltip="一題有可能有多個標籤，所以占比實際上是出現的機率。請不要拿這份資料預測未來考題。"
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
					<th>標籤</th><th>題目數</th><th>占比</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="tagData in sortedTagStat">
					<td>
						<Tag :tag="tagData.tag" clickToSearch></Tag>
					</td>
					<td>{{ tagData.count }}</td>
					<td>{{ tagData.percent.toFixed(2) }}%</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import Tag from "@/components/problem/Tag.vue"; // tag 組件
import stat from "@/stat/problem-stat.json"; // 統計資料

const sortedTagStat = Object.entries(stat.tagsNumber).sort((a, b) => b[1]-a[1]).map( // 降序排列的 tag 統計資料
	([tag, count]) => ({ tag, count, percent: count / stat.problemNumber * 100 })
);
</script>

<style scoped>
.stat-table > tbody > tr > td:not(:first-child), th:not(:first-child) {
	text-align: right; /* 表格元素靠右排列 */
}
</style>
