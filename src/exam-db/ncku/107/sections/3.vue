<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #problem>
			Let $M = \!\begin{bmatrix} 2 & 2 & 0 & 0 \\ 2 & 6 & -2 & 0 \\ 0 & -2 & 5 & -2 \\ 0 & 0 & -2 & 3 \end{bmatrix}\!$.
		</template>
		<template #a>Whether matrix $M$ is positive definite? Why?</template>
		<template #b>Are all eigenvalues of $M$ greater than 0 and smaller than 2? Why?</template>
	</MakeProblem>
</template>
