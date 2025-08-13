<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		<template v-for="({ uni, year, no, problemConfig }, i) in problemDatas" :key="`${uni}-${year}-${no}`">
			<div v-if="i < maxDisplayNumber" class="ts-box ts-content" style="width: 790px;">
				
				<div class="ts-wrap is-top-aligned">
					<div class="problem-name"><!-- 題號 -->
						<span>{{ dbConfig.uniConfigs[uni].shortName }} {{ year }} 第 {{ no }} 題</span>
					</div>
					<Tag v-for="tag in (problemConfig.tags ?? [])" :tag="tag"></Tag><!-- tags -->
				</div>
				
				<Problem :uni="uni" :year="year" :no="no" :problemConfig="problemConfig" showLink hideProblemScore>
				</Problem><!-- 題目預覽 -->
				
			</div>
		</template>
	</div>
</template>

<script setup>
import Problem from "@/components/problem/Problem.vue"; // 題目組件
import Tag from "@/components/problem/Tag.vue"; // tag 組件
import dbConfig from "@/exam-db/config.json"; // db config

const props = defineProps({
	problemDatas: { type: Array, default: [] }, // 搜尋結果的題目資料
	maxDisplayNumber: { type: Number, default: 0 }, // 最多顯示幾題
});
</script>

<style scoped>
.problem-name { /* 某學校某年第幾題的樣式 */
	margin-bottom: 10px;
}
.problem-name > span {
	display: inline-block;
	padding: 0 6px;
	background-color: #bdf;
	border-radius: 4px;
}
</style>
