<template>
	<GroupTF :startNo="16" :subProblemNumber="5">
		<template #problem>If $n \times n$ matrix $A$ is diagonalizable, then</template>
		<template #16>$0$ is not the eigenvalue of $A$.</template>
		<template #17>$A$ has $n$ distinct eigenvalues.</template>
		<template #18>$A$ is invertible.</template>
		<template #19>$A^T$ is also diagonalizable.</template>
		<template #20>The diagonalization is unique.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
