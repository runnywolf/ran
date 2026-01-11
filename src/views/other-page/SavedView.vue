<template>
	<template v-for="({ uni, year, no }, i) in decodedProblemIds">
		<template v-if="i < maxResultProblemNumber">
			<div v-if="i !== 0" class="ts-divider is-section"></div><!-- 分隔線 -->
			<Problem :uni="uni" :year="year" :no="no" hideProblemScore showTopRow showLink></Problem>
		</template>
	</template>
	<EdgeSentinel @onEntry="maxResultProblemNumber += LOAD_PROBLEM_NUMBER" /><!-- 題目清單尾端的隱形元素, 用來判斷是否要載入元素 -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ProblemSaver } from "@lib/exam-db";
import Problem from "@/components/problem/Problem.vue"; // 題目組件
import EdgeSentinel from "@/components/global/EdgeSentinel.vue"; // 隱形元素, 用來判斷是否要載入元素

const LOAD_PROBLEM_NUMBER = 5; // 當頁面往下滑, 一次載入的題目數
const maxResultProblemNumber = ref(LOAD_PROBLEM_NUMBER);
const decodedProblemIds = ProblemSaver.getAllDecodedProblemId(); // 不做 local session 的監聽
</script>
