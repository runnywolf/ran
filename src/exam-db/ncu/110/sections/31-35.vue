<template>
	<GroupTF :startNo="31" :subProblemNumber="5">
		<template #problem>If $C$ is a $n \times n$ covariance matrix, then</template>
		<template #31>$C$ always have $n$ orthogonal eigenvectors.</template>
		<template #32>$C$ always have $n$ distinct real eigenvalues.</template>
		<template #33>$C$ has positive and negative eigenvalues but no zero eigenvalues.</template>
		<template #34>$C$ can always be decomposed into $AA^T$, where $A$ is a matrix.</template>
		<template #35>$C$ is exactly positive definite.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
