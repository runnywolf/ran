<template>
	<template v-for="({ uni, year, no }, i) in decodedProblemIds">
		<Problem :uni="uni" :year="year" :no="no" hideProblemScore showTopRow showLink></Problem>
		<div v-if="i != decodedProblemIds.length - 1" class="ts-divider is-section"></div>
	</template>
</template>

<script setup lang="ts">
import { ProblemSaver } from "@lib/exam-db";
import Problem from "@/components/problem/Problem.vue"; // 題目組件

const decodedProblemIds = ProblemSaver.getAllDecodedProblemId(); // 不做 local session 的監聽
</script>
