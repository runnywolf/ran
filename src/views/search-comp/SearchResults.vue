<template>
	<div class="ts-wrap is-vertical is-compact" style="width: 790px;">
		<template v-for="({ uni, year, no, problemConfig }, i) in problemDatas" :key="`${uni}-${year}-${no}`">
			<div v-if="i < maxResultProblemNumber" class="ts-box ts-content">
				<Problem :uni="uni" :year="year" :no="no" :problemConfig="problemConfig"
					hideProblemScore showLink showTopRow
				></Problem>
			</div>
		</template>
		<div ref="bottomElement"></div><!-- 題目清單尾端的隱形元素, 用來判斷是否要載入元素 -->
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { ProblemSearchData } from "@/libs/exam-db";
import Problem from "@/components/problem/Problem.vue"; // 題目組件

const LOAD_PROBLEM_NUMBER = 5; // 當頁面往下滑, 一次載入的題目數

interface Props {
	problemDatas: Array<ProblemSearchData>, // 搜尋結果的題目資料
};
const props = withDefaults(defineProps<Props>(), { // 預設值
  problemDatas: () => [],
});

let observer: IntersectionObserver | null = null;
const bottomElement = ref<HTMLElement>(); // 題目清單尾端的隱形元素, 用來判斷是否要載入元素
const maxResultProblemNumber = ref(LOAD_PROBLEM_NUMBER);

onMounted(() => {
	observer = new IntersectionObserver(([entry]) => { // 當題目清單尾端的隱形元素顯示在螢幕上時, 增加顯示的題目數
		if (entry.isIntersecting) maxResultProblemNumber.value += LOAD_PROBLEM_NUMBER;
	});
	if (bottomElement.value) observer.observe(bottomElement.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
