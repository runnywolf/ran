<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(6 points)', '(4 points)']">
		<template #problem>
			Consider a matrix $A = \!\begin{bmatrix} a & b \\ 0 & c \end{bmatrix}\!$, $a \neq c$.
		</template>
		<template #a>Factor the matrix $A$ into $X D X^{-1}$ where $D$ is diagonal.</template>
		<template #b>Calculate $e^A$.</template>
	</MakeProblem>
</template>
