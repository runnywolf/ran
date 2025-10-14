<template>
	<GroupTF :startNo="1" :subProblemNumber="10">
		<template #problem>$A, B,$ and $C$ are matrices, $r$ is a scalar</template>
		<template #1>$AB = BA$.</template>
		<template #2>$AB = AC ~~\Rightarrow~~ B = C$.</template>
		<template #3>$AB = 0 ~~\Rightarrow~~ A = 0$ or $B = 0$.</template>
		<template #4>$(AB)^T = A^T B^T$.</template>
		<template #5>$(rA)^{-1} = rA^{-1}$.</template>
		<template #6>$\det(A+B) = \det(A)+\det(B)$.</template>
		<template #7>$\det(AB) = \det(A)\det(B)$.</template>
		<template #8>$\det(AB) = \det(BA)$.</template>
		<template #9>$\det(rA) = r \det(A)$.</template>
		<template #10>$\det(A^{-1}) = (-1)\det(A)$.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
