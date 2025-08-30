<template>
	<MakeProblem scoreText="(10%)" listEndLabel="c" :listItemScoreTexts="['(3%)', '(3%)', '(4%)']">
		<template #problem>
			Let $M = \!\begin{bmatrix} a & 0 & a \\ a & 2a & -2a \\ a & a & 0 \end{bmatrix}\!$, where $a = 1$.
		</template>
		<template #a>Find the minimal polynomial of $M$.</template>
		<template #b>Find the Jordan canonical form of $M$.</template>
		<template #c>Find the Jordan basis for $M$.</template>
	</MakeProblem>
</template>
