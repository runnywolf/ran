<template>
	<GroupTF :startNo="11" :subProblemNumber="5">
		<template #problem>$Ax = b$ is a consistent linear system.</template>
		<template #11>If $b \neq 0$, the solution set may be a subspace.</template>
		<template #12>If $b \neq 0$, the solution set is not a subspace.</template>
		<template #13>If $b = 0$, the solution set may be or may not be a subspace.</template>
		<template #14>If $b = 0$, the solution set is not a subspace.</template>
		<template #15>If $b = 0$, the solution set is exactly a subspace.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
