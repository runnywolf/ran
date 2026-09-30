<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(4%)','(4%)']">
		<template #problem>
			Suppose $T:\mathbb{R}^2\to\mathbb{R}^2$ is a linear transformation such that
			$$T@(){@bm{3;2}}=@bm{-4;11} \quad\text{and}\quad T@(){@bm{-4;-4}}=@bm{4;-8}.$$
		</template>
		<template #a>Find the standard matrix of linear transformation $T$.</template>
		<template #b>Please find a generating set for the range of this linear transformation $T$.</template>
	</MakeProblem>
</template>
