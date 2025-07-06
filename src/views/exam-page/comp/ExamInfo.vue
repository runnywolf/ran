<template>
	<table class="sidebar-table">
		<tbody>
			
			<!-- 學校簡稱 -->
			<tr>
				<td>
					<span class="ts-icon is-school-icon"></span>
				</td>
				<td>
					{{ uniShortName ?? "-" }}
				</td>
			</tr>
			
			<!-- 題本年份 -->
			<tr>
				<td>
					<span class="ts-icon is-calendar-icon"></span>
				</td>
				<td>
					{{ examYear ?? "-" }}&nbsp;年
				</td>
			</tr>
			
			<!-- 題本的科目代號 -->
			<tr>
				<td>
					<span class="ts-icon is-hashtag-icon"></span>
				</td>
				<td>
					<span>{{ subjectCode ?? "-" }}</span>
					<span
						class="ts-icon is-circle-question-icon is-start-spaced"
						data-tooltip="每份題本在當年度的唯一編號"
					></span>
				</td>
			</tr>
			
			<!-- 題本的科目 -->
			<tr>
				<td>
					<span class="ts-icon is-file-icon"></span>
				</td>
				<td>
					{{ subjectShortName ?? "-" }}
				</td>
			</tr>
			
		</tbody>
	</table>
</template>

<script setup>
const props = defineProps({
	uniShortName: String, // 學校中文縮寫
	examYear: String, // 題本年份
	subjectCode: String, // 科目代號
	subjectShortName: String, // 科目縮寫
});
</script>

<style scoped>
.sidebar-table > tbody > tr > td:first-child {
	text-align: center; /* 置中 icon */
}
.sidebar-table > tbody > tr:not(:first-child) > td {
	padding-top: 4px; /* select 間的距離 */
}
.sidebar-table > tbody > tr > td:not(:first-child) {
	padding-left: 8px; /* 學校下拉選單跟 icon 的距離 */
}
</style>
