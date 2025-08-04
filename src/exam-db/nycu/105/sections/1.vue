<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(2 points)', '(2 points)', '(2 points)']">
		<template #problem>
			Determine and explain whether each of the following sets is a subspace of $\mathbb{R}^{2 \times 2}$.
		</template>
		<template #a>The set of all 2x2 triangular matrices.</template>
		<template #b>The set of all 2x2 lower triangular matrices.</template>
		<template #c>The set of all 2x2 orthogonal matrices.</template>
	</MakeProblem>
</template>
