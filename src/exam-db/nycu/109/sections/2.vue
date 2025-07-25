<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[4 points]', '[4 points]']">
		<template #problem>Give a recursive definition of the sequence $\{a_n\},~ n = 1, 2, 3, \cdots$ if</template>
		<template #a>$a_n = 1 + (-1)^n$.</template>
		<template #b>$a_n = n(n + 1)$.</template>
	</MakeProblem>
</template>
