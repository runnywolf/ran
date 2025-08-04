<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #problem>Let $A$ be a 5 by 7 matrix with rank 4.</template>
		<template #a>What is the dimension of the solution space of $Ax = 0$?</template>
		<template #b>Is $Ax = b$ consistent for all vectors $b$ in $\mathbb{R}^5$? Explain.</template>
	</MakeProblem>
</template>
