<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #problem>
			If a 26‑digital ternary $(0,1,2)$ sequence is randomly generated, what is the probability that:
		</template>
		<template #a>It has an even number of 0’s and an even number of 2’s?</template>
		<template #b>It has an odd number of 0’s, an odd number of 1’s, and an even number of 2’s?</template>
	</MakeProblem>
</template>
