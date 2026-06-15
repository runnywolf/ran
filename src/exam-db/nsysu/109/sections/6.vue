<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[6%]', '[6%]']">
		<template #problem>
			Find the generating function for the number of partitions of the nonnegative integer $n$ into summands where
		</template>
		<template #a>each summand must appear an even number of times;</template>
		<template #b>each summand must be even.</template>
	</MakeProblem>
</template>
