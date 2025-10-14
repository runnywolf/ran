<template>
	<GroupTF :startNo="26" :subProblemNumber="5">
		<template #problem>
			Let $A$ be an $m \times n$ matrix with orthogonal columns.<br>
			If $W$ is a subset of $\mathbb{R}^n$ and $W^\perp$ is the orthogonal complement of $W$.
		</template>
		<template #26>$\text{Nul}(A)$ is the orthogonal complement of $\text{Row}(A)$.</template>
		<template #27>$W^\perp$ is always a subspace.</template>
		<template #28>$(W^\perp)^\perp = W$.</template>
		<template #29>If $v$ and $w$ is orthogonal, then $Av$ and $Aw$ is orthogonal.</template>
		<template #30>$W \cup W^\perp = \mathbb{R}^n$.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
