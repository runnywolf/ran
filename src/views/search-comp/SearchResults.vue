<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		<template v-for="({ uni, year, no, problemConfig }, i) in problemDatas" :key="`${uni}-${year}-${no}`">
			<div v-if="i < maxDisplayNumber" class="ts-box ts-content" style="width: 790px;">
				<Problem :uni="uni" :year="year" :no="no" :problemConfig="problemConfig"
					hideProblemScore showLink showTopRow
				></Problem>
			</div>
		</template>
	</div>
</template>

<script setup>
import Problem from "@/components/problem/Problem.vue"; // 題目組件

const props = defineProps({
	problemDatas: { type: Array, default: [] }, // 搜尋結果的題目資料
	maxDisplayNumber: { type: Number, default: 0 }, // 最多顯示幾題
});
</script>
