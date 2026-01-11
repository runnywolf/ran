<template>
	<div class="ts-wrap is-vertical is-compact" style="width: 790px;">
		<template v-for="({ uni, year, no, problemConfig }, i) in problemDatas" :key="`${uni}-${year}-${no}`">
			<div v-if="i < maxResultProblemNumber" class="ts-box ts-content">
				<Problem :uni="uni" :year="year" :no="no" :problemConfig="problemConfig"
					hideProblemScore showLink showTopRow
				></Problem>
			</div>
		</template>
		<EdgeSentinel @onEntry="maxResultProblemNumber += LOAD_PROBLEM_NUMBER" /><!-- 題目清單尾端的隱形元素, 用來判斷是否要載入元素 -->
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ProblemSearchData } from "@/libs/exam-db";
import Problem from "@/components/problem/Problem.vue"; // 題目組件
import EdgeSentinel from "@/components/global/EdgeSentinel.vue"; // 隱形元素, 用來判斷是否要載入元素

interface Props {
	problemDatas: Array<ProblemSearchData>, // 搜尋結果的題目資料
};
const props = withDefaults(defineProps<Props>(), { // 預設值
  problemDatas: () => [],
});

const LOAD_PROBLEM_NUMBER = 5; // 當頁面往下滑, 一次載入的題目數
const maxResultProblemNumber = ref(LOAD_PROBLEM_NUMBER);
</script>
