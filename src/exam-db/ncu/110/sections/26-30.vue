<template>
	<GroupTF :startNo="26" :subProblemNumber="5">
		<template #problem>
			If $A$ is a $m \times n$ matrix; $Ax = b$ is an inconsistent system and has a least‑square solution $\hat{x}$.
		</template>
		<template #26>$b$ is exactly not in $\text{Col}(A)$.</template>
		<template #27>$\hat{x}$ is not a unique solution.</template>
		<template #28>If $A^T A$ is not invertible, then the system has no solution.</template>
		<template #29>$A \hat{x}$ is not always in $\text{Col}(A)$.</template>
		<template #30>$b - A \hat{x}$ is always in $\text{Nul}(A^T)$.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
