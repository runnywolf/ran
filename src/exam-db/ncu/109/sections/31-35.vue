<template>
	<GroupTF :startNo="31" :subProblemNumber="5">
		<template #problem>
			$A$ is a linear‑transformation matrix in the standard coordinate system. 
			If the coordinate system is changed to $\beta$ coordinate system, 
			to find the transformation matrix (called the $\beta\!$‑matrix) relative to $\beta$ for 
			the transformation $x \mapsto Ax$, where $\beta = \{b_1, b_2, b_3\}$,
			$$
			A = @bm{ -7, -48, -16; 1, 14, 6; -3, -45, -19 } ,~~
			b_1 = @bm{ -3; 1; -3 } ,~~ b_2 = @bm{ -2; 1; -3 } ,~~ b_3 = @bm{ 3; -1; 0 } .
			$$
		</template>
		<template #31>$0 ,~ -1$ are in the $\beta\!$‑matrix.</template>
		<template #32>$1 ,~ -3$ are in the $\beta\!$‑matrix.</template>
		<template #33>$-2 ,~ -4$ are in the $\beta\!$‑matrix.</template>
		<template #34>$-6 ,~ -7$ are in the $\beta\!$‑matrix.</template>
		<template #35>$8 ,~ -9$ are in the $\beta\!$‑matrix.</template>
	</GroupTF>
</template>

<script setup>
import GroupTF from "@/exam-db/ncu/GroupTF.vue";
</script>
