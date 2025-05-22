<template>
	<MakeProblem :score="5" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Assume that <vl exp="A \in \mathbb{R}^{n \times n}" /> and <vl exp="A^2 + 4A + 6I_n = O" />.
			If <vl exp="(A + 3I_n)^{-1} = aA + bI_n" />. what is the value of <vl exp="2a + b" />?
		</template>
		<template #A>-2</template>
		<template #B>-1</template>
		<template #C>0</template>
		<template #D>1</template>
		<template #E>2</template>
	</MakeProblem>
</template>
