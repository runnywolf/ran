<template>
	<MakeProblem :score="10" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			The number of positive integer solutions of
			<vl exp="x_1 + x_2 + \cdots + x_n = r" /> equals
		</template>
		<template #A><vl exp="\binom{r-1}{n-1}" /></template>
		<template #B><vl exp="\binom{n+r-1}{n-1}" /></template>
		<template #C><vl exp="\binom{r}{n}" /></template>
		<template #D><vl exp="r^n" /></template>
		<template #E><vl exp="(rn)!" /></template>
	</MakeProblem>
</template>
