<template>
	<MakeProblem scoreText="(20%)" listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #problem>
			If $G$ and $\overline{G}$ are two complementary graphs with the number of
			vertices greater than or equal to $X$, then either $G$ or $\overline{G}$ is nonplanar.
		</template>
		<template #a>
			Please find the value of $X$.
		</template>
		<template #b>
			Please explain the reason.
		</template>
	</MakeProblem>
</template>
