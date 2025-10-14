<template>
	<GroupTF :startNo="21" :subProblemNumber="5">
		<template #problem>If $n \times n$ matrix $A$ is diagonalizable, then</template>
		<template #21>$A$ has $n$ distinct eigenvalues.</template>
		<template #22>$A$ has $n$ linearly independent columns.</template>
		<template #23>$A^T$ and $A^{-1}$ are all diagonalizable.</template>
		<template #24>$A$ has no zero eigenvalues.</template>
		<template #25>$A$ has $n$ linearly independent eigenspaces.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
