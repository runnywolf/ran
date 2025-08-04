<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #problem>
			Let $C = \!\begin{bmatrix} 3 & -1 & -2 \\ 2 & 0 & -2 \\ 2 & -1 & -1 \end{bmatrix}\!$ is a 3x3 matrix.
		</template>
		<template #a>Please find the value of $\lim\limits_{n \to \infty} C^n$.</template>
		<template #b>Please compute the value of $e^C$.</template>
	</MakeProblem>
</template>
