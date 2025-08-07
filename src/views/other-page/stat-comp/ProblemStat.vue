<template>
	<div class="ts-text is-big is-bold" style="margin-top: -6px; margin-bottom: 8px;">
		題目統計
	</div>
	<div class="ts-text">
		已收錄 {{ stat.examNumber }} 題本，其中 {{ stat.answerCompleteExamNumber }}
		份有完整詳解 ({{ (stat.answerCompleteExamNumber / stat.examNumber * 100).toFixed(2) }}%)。<br>
		總共收錄 {{ stat.problemNumber }} 題，其中 {{ stat.problemHasAnswerNumber }}
		題有答案 ({{ (stat.problemHasAnswerNumber / stat.problemNumber * 100).toFixed(2) }}%)。
	</div>
</template>

<script setup>
import stat from "@/stat/problem-stat.json"; // 統計資料
</script>

<style scoped>
.stat-table > tbody > tr > td {
	text-align: right; /* 表格元素靠右排列 */
}
</style>
