<template>
	<MakeProblem :score="10" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Which solves <vl exp="a_n = a_{n-1} + 6a_{n-2}" /> for <vl exp="a_n" />
			in terms of <vl exp="a_0 = A" /> and <vl exp="a_1 = B" />:
		</template>
		<template #A><vl exp="\frac{1}{5} [ (-3)^n(2A-B) + 2^n(3A+B) ]" /></template>
		<template #B><vl exp="\frac{1}{5} [ (-3)^n(2A-B) + 2^n(3A-B) ]" /></template>
		<template #C><vl exp="\frac{1}{5} [ (-2)^n(3A-B) + 3^n(2A+B) ]" /></template>
		<template #D><vl exp="\frac{1}{5} [ (-2)^n(3A+B) + 3^n(2A+B) ]" /></template>
		<template #E><vl exp="\frac{1}{5} [ (-2)^n(3A-B) + 3^n(2A-B) ]" /></template>
	</MakeProblem>
</template>
