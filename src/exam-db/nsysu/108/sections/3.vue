<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[7%]', '[7%]']">
		<template #problem>Let $A,B$ be sets from a universe $U$.</template>
		<template #a>Write a quantified statement to express the proper subset relation $A \subset B$.</template>
		<template #b>Negate the result in part (a) to determine when $A \not\subset B$.</template>
	</MakeProblem>
</template>
