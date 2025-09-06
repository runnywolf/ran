<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #a>
			How many bit strings of length 8 do not contain three consecutive 1’s?
		</template>
		<template #b>
			What is the probability that a ternary sequences (sequence made up of the digits 0, 1, 2) of
			length 8 contains even number of 1’s bits?
		</template>
	</MakeProblem>
</template>
