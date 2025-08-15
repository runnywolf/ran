<template>
	<div class="ts-box ts-wrap is-center-aligned">
		<div class="ts-content is-padded">
			<div class="ts-box">
				<table class="ts-table is-celled is-dense is-compact menu-table">
					
					<thead>
						<tr>
							<th v-for="uni in dbConfig.uniList">
								<span :data-tooltip="dbConfig.uniConfigs[uni].name" data-position="top">
									{{ getUniShortName(uni) }}
								</span>
							</th>
						</tr>
					</thead>
					
					<tbody>
						<tr v-for="year in sortedAllYearArr">
							<td v-for="uni in dbConfig.uniList">
								<RanLink v-if="isExamExist[year][uni]" :to="`#/exam/${uni}-${year}`">
									{{ `${getUniShortName(uni)} ${year}` }}
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
import { getUniShortName } from "@/exam-db/examLoader.js"; // 讀取題本資料
import dbConfig from "@/exam-db/config.json"; // 保存題本資訊的設定檔

const isExamExist = {}; // { year: dict } ; 某一年有哪些學校的題本是存在的
for (const [uni, { yearList }] of Object.entries(dbConfig.uniConfigs)) {
	for (const year of yearList) {
		if (!(year in isExamExist)) isExamExist[year] = {};
		isExamExist[year][uni] = true; // 只是把 dict 當成 set 來用
	}
}
const sortedAllYearArr = Object.keys(isExamExist).sort((a, b) => Number(b) - Number(a)); // 所有題本的年份 (降序排列)
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
