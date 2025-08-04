<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(2 points)', '(2 points)']">
		<template #problem>
			Let $\{ x_1, x_2, x_3 \}$ be linearly independent (LID) vectors in $\mathbb{R}^n$.
			Determine and explain whether each of the following vector sets is LID.
		</template>
		<template #a>$y_1 = x_1 + x_2,~ y_2 = x_2 + x_3$, and $y_3 = x_3 + x_1$.</template>
		<template #b>$z_1 = x_2 - x_1,~ z_2 = x_3 - x_2$, and $z_3 = x_3 - x_1$.</template>
	</MakeProblem>
</template>
