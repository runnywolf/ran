<template>
	<MakeProblem :score="10" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			If <vl exp="|A| = 2^4" /> and <vl exp="|B| = 2^3" />, how many functions from
			<vl exp="A" /> to <vl exp="B" /> are there?
		</template>
		<template #A><vl exp="2^{7}" /></template>
		<template #B><vl exp="2^{12}" /></template>
		<template #C><vl exp="2^{32}" /></template>
		<template #D><vl exp="2^{48}" /></template>
		<template #E><vl exp="2^{3^{16}}" /></template>
	</MakeProblem>
</template>
