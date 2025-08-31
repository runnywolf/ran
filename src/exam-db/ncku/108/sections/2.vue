<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #problem>
			Let
			$$A = \!\begin{bmatrix} 2 & -1 & 0 & 0 \\ -1 & 2 & -1 & 0 \\ 0 & -1 & 2 & -1 \\ 0 & 0 & -1 & 2 \end{bmatrix}$$
		</template>
		<template #a>Compute the $LU$ factorization of $A$.</template>
		<template #b>Explain why $A$ must be positive definite.</template>
	</MakeProblem>
</template>
