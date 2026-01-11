<template>
	<template v-for="({ uni, year, no }, i) in decodedProblemIds">
		<template v-if="i < maxResultProblemNumber">
			<div v-if="i !== 0" class="ts-divider is-section"></div><!-- 分隔線 -->
			<Problem :uni="uni" :year="year" :no="no" hideProblemScore showTopRow showLink></Problem>
		</template>
	</template>
	<div ref="bottomElement"></div><!-- 題目清單尾端的隱形元素, 用來判斷是否要載入元素 -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ProblemSaver } from "@lib/exam-db";
import Problem from "@/components/problem/Problem.vue"; // 題目組件

const LOAD_PROBLEM_NUMBER = 5; // 當頁面往下滑, 一次載入的題目數

const decodedProblemIds = ProblemSaver.getAllDecodedProblemId(); // 不做 local session 的監聽

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
