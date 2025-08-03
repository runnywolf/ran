<template>
	<MakeProblem scoreText="(10 points)" listEndLabel="c" :listItemScoreTexts="['(3 points)', '(3 points)', '(4 points)']">
		<template #problem>
			How many bit string of length 20 contain at most Nineteen 1s? Please expressed as $A^B + C$.
		</template>
		<template #a>$A = \underline{\qquad}$</template>
		<template #b>$B = \underline{\qquad}$</template>
		<template #c>$C = \underline{\qquad}$</template>
	</MakeProblem>
</template>
