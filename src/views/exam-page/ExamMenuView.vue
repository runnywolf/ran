<template>
	<div class="ts-box ts-wrap is-center-aligned">
		<div class="ts-content is-padded">
			<div class="ts-box">
				<table class="ts-table is-celled is-dense is-compact menu-table">
					
					<thead>
						<tr>
							<th v-for="uni in config.uniList">
								<span :data-tooltip="config.uniConfigs[uni].name" data-position="top">
									{{ config.uniConfigs[uni].shortName }}
								</span>
							</th>
						</tr>
					</thead>
					
					<tbody>
						<tr v-for="year in tableYearList">
							<td v-for="uni in config.uniList">
								<RanLink v-if="yearSet[uni].has(year)" :to="`#/exam/${uni}-${year}`">
									{{ config.uniConfigs[uni].shortName }}&nbsp;{{ year }}
								</RanLink>
								<span v-else>&nbsp;</span><!-- 防止整個 row 都沒有 link 而塌陷 -->
							</td>
						</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import config from "@/exam-db/config.json"; // 保存題本資訊的設定檔

const yearSet = ref({}); // 用於查詢學校的某個年份的題本是否存在
const tableYearList = ref([]); // Array<number> ; 表格有哪些年份

onMounted(() => { // 當組件載入時
	let yearRange = [Infinity, -Infinity]; // 表格的年份跨度
	
	for (const uni of config.uniList) { // 遍歷所有學校
		const yearArr = config.uniConfigs[uni].yearList.map(Number); // 題本年份 String[] 轉 Number[]
		yearSet.value[uni] = new Set(yearArr); // 題本年份 Number[] 轉 Set
		
		if (yearArr.length == 0) continue; // 若學校的題本數為 0, 不處理
		
		yearRange[0] = Math.min(yearRange[0], Math.min(...yearArr)); // 求各校題本年份的最小值
		yearRange[1] = Math.max(yearRange[1], Math.max(...yearArr)); // 求各校題本年份的最大值
	}
	
	if (yearRange[0] === Infinity || yearRange[1] === -Infinity) return;
	for (let i = yearRange[1]; i >= yearRange[0]; i--) tableYearList.value.push(i);
});
</script>

<style scoped>
.menu-table {
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.menu-table > thead > tr > th {
	text-align: center; /* 元素置中 */
}
.menu-table > tbody > tr > td {
	text-align: center; /* 元素置中 */
}
</style>
