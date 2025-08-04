<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #a>
			Please prove that $x^5 - 2x^4 + x^3 - 2x^2 - 7x - 1 = 0$ has a solution $x$ which is an integer.
		</template>
		<template #b>
			Given a 4x82 grid, each vertex is colored in one of three different colors,
			please show that we can always find a rectangle with four vertices in the same color.
		</template>
	</MakeProblem>
</template>
