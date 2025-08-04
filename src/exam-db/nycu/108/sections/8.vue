<template>
	<MakeProblem listEndLabel="d" :listItemScoreTexts="['(2 points)', '(2 points)', '(2 points)', '(2 points)']">
		<template #problem>
			Determine whether each of these functions is a bijection from $\mathbb{R}$ to $\mathbb{R}$.
		</template>
		<template #a>$f(x) = -3x + 4$</template>
		<template #b>$f(x) = -3x^2 + 7$</template>
		<template #c>$f(x) = (x + 1)/(x + 2)$</template>
		<template #d>$f(x) = x^5 + 1$</template>
	</MakeProblem>
</template>
