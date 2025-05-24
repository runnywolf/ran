<template>
	<MakeProblem scoreText="(5%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Let <vl exp="S, D," /> and <vl exp="Q \in M_n(R)" />
			represent a symmetric matrix, a diagonal matrix, and an orthogonal matrix.
			Assume that their degree of freedom are <vl exp="d_S, d_D" /> and <vl exp="d_Q" />,
			respectively. Find the value of <vl exp="d_S - d_D - d_Q" />.
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
