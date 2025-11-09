<template>
	<GroupTF :startNo="16" :subProblemNumber="5">
		<template #problem>$A$ and $B$ are two invertible matrices. If $A$ is similar to $B$.</template>
		<template #16>$\det(A) = \det(B)$.</template>
		<template #17>$A^2$ is similar to $B^2$.</template>
		<template #18>$A^T$ is similar to $B^T$.</template>
		<template #19>$A^{-1}$ is similar to $B^{-1}$.</template>
		<template #20>$AB$ is similar to $BA$.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
