<template>
	<div class="ts-box ts-wrap is-center-aligned">
		<div class="ts-content is-padded">
      <div class="ts-box">
				<table class="ts-table is-celled is-dense is-compact menu-table">
					<thead>
						<tr>
							<th v-for="uni in config.uniList">{{ config.uni[uni].shortName }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="year in yearList">
							<td v-for="uni in config.uniList">
								<router-link v-if="yearSet[uni].has(year)" :to="`/exam/${uni}-${year}`" class="hyperlink">
									{{ config.uni[uni].shortName }}&nbsp;{{ year }}
								</router-link>
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
import config from "@/components/exam/config.json"; // 保存題本資訊的設定檔

const yearSet = ref({}); // 用於查詢學校的某個年份的題本是否存在
const yearList = ref([]); // 表格的年份 arr

onMounted(() => { // 當組件載入時
	let yearRange = [Infinity, -Infinity]; // 表格的年份跨度
	
	for (const uni of config.uniList) { // 遍歷所有學校
		const yearArr = config.uni[uni].yearList.map(Number); // 題本年份 String[] 轉 Number[]
		yearSet.value[uni] = new Set(yearArr); // 題本年份 Number[] 轉 Set
		
		if (yearArr.length == 0) continue; // 若學校的題本數為 0, 不處理
		
		yearRange[0] = Math.min(yearRange[0], Math.min(...yearArr)); // 求各校題本年份的最小值
		yearRange[1] = Math.max(yearRange[1], Math.max(...yearArr)); // 求各校題本年份的最大值
	}
	
	if (yearRange[0] === Infinity || yearRange[1] === -Infinity) return;
	for (let i = yearRange[1]; i >= yearRange[0]; i--) yearList.value.push(i);
});
</script>

<style scoped>
.menu-table > thead > tr > th {
	text-align: center; /* 元素置中 */
}
.menu-table > tbody > tr > td {
	text-align: center; /* 元素置中 */
}
</style>
