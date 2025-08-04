<template>
	<MakeProblem scoreText="(10 points)" listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #problem>
			Assume $n = 2^k,~ k \in \mathbb{N}$.
			The straightforward way to multiply two $n \times n$ matrices takes time $O(n^3)$.
		</template>
		<template #a>Please describe an asymptotically faster multiplication method.</template>
		<template #b>Use the recurrence relation to analyze the time complexity of your method.</template>
	</MakeProblem>
</template>
