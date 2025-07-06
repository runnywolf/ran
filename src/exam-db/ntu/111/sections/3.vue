<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			The generating function in partial fraction decomposition for the recurrence equation
			<vl exp="a_n = -a_{n-1} + 6a_{n-2}" /> for <vl exp="a_n" /> in terms of
			<vl exp="a_0 = A" /> and <vl exp="a_1 = B" /> is :
		</template>
		<template #A><vl exp="\frac{1}{5} [ \frac{2A+B}{1-3x} + \frac{3A-B}{1+2x} ]" /></template>
		<template #B><vl exp="\frac{1}{5} [ \frac{2A+B}{1-3x} + \frac{3A+B}{1+2x} ]" /></template>
		<template #C><vl exp="\frac{1}{5} [ \frac{2A-B}{1-3x} + \frac{3A-B}{1+2x} ]" /></template>
		<template #D><vl exp="\frac{1}{5} [ \frac{3A-B}{1-2x} + \frac{2A-B}{1+3x} ]" /></template>
		<template #E><vl exp="\frac{1}{5} [ \frac{3A+B}{1-2x} + \frac{2A-B}{1+3x} ]" /></template>
	</MakeProblem>
</template>
