<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		<template v-for="({ uni, year, no, problemConfig }, i) in problemDatas" :key="`${uni}-${year}-${no}`">
			<div v-if="i < maxDisplayNumber" class="ts-box ts-content" style="width: 790px;">
				
				<div class="ts-grid" style="margin-bottom: 10px;">
					<div class="column problem-name"><!-- 題號 -->
						<span>{{ getUniShortName(uni) }} {{ year }} 第 {{ no }} 題</span>
					</div>
					<div class="column is-fluid ts-grid is-top-aligned" style="row-gap: 10px;">
						<Tag v-for="tag in (problemConfig.tags ?? [])" :tag="tag"></Tag><!-- tags -->
					</div>
				</div>
				
				<Problem :uni="uni" :year="year" :no="no" :problemConfig="problemConfig" showLink hideProblemScore>
				</Problem><!-- 題目預覽 -->
				
			</div>
		</template>
	</div>
</template>

<script setup>
import { getUniShortName } from "@/exam-db/examLoader.js"; // 讀取題本資料
import Problem from "@/components/problem/Problem.vue"; // 題目組件
import Tag from "@/components/problem/Tag.vue"; // tag 組件

const props = defineProps({
	problemDatas: { type: Array, default: [] }, // 搜尋結果的題目資料
	maxDisplayNumber: { type: Number, default: 0 }, // 最多顯示幾題
});
</script>

<style scoped>
.problem-name > span {
	display: inline-block;
	padding: 0 6px;
	background-color: #bdf;
	border-radius: 4px;
}
</style>
