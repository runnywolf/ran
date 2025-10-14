<template>
	<GroupTF :startNo="36" :subProblemNumber="5">
		<template #problem>
			Find a $QR$ factorization of matrix $@bm{ 1, 3, 5; 1, 1, 0; 1, 1, 2; 1, 3, 3 }$.
		</template>
		<template #36>$1$ is not in $R$ matrix.</template>
		<template #37>$3$ is not in $R$ matrix.</template>
		<template #38>$5$ is not in $R$ matrix.</template>
		<template #39>$7$ is not in $R$ matrix.</template>
		<template #40>$9$ is not in $R$ matrix.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
