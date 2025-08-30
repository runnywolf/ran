<template>
	<MakeProblem scoreText="(25%)" listEndLabel="e" :listItemScoreTexts="['(5%)', '(5%)', '(5%)', '(5%)', '(5%)']">
		<template #problem>
			Let $A = \!\begin{bmatrix} 2 & 5 & 4 \\ 6 & 3 & 0 \\ 6 & 3 & 0 \\ 2 & 5 & 4 \end{bmatrix}$,
			$R$: range , $N$: nullspace.
		</template>
		<template #a>Find the singular value decomposition of $A$.</template>
		<template #b>Find the orthonormal bases of $R(A^T)$.</template>
		<template #c>Find the orthonormal bases of $R(A)$.</template>
		<template #d>Find the orthonormal bases of $N(A)$.</template>
		<template #e>Find the orthonormal bases of $N(A^T)$.</template>
	</MakeProblem>
</template>
