<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #problem>Find the coefficient of $x^7$ in each of the following formulas.</template>
		<template #a>$(x^2-3x) / (1-x)^5 + 3x^7 + 5$</template>
		<template #b>$-2 / ((x-1)(x-2))$</template>
	</MakeProblem>
</template>
