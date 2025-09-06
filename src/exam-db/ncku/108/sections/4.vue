<template>
	<MakeProblem scoreText="(15%)" listEndLabel="c" :listItemScoreTexts="['(5%)', '(5%)', '(5%)']">
		<template #problem>
			Consider the set $S = \{ a, b, c, d, e \}$, and a logical matrix $M$ corresponding to
			a relation $R$ on the set $S$ is shown in the following.
			$$
			M = \!\begin{bmatrix}
			1 & 0 & 1 & 0 & 0 \\
			0 & 1 & 0 & 0 & 0 \\
			0 & 0 & 1 & 0 & 0 \\
			1 & 1 & 1 & 1 & 1 \\
			0 & 1 & 1 & 0 & 1
			\end{bmatrix}
			$$
		</template>
		<template #a>
			In order to check if there exists a partial ordering, which properties should you check?
		</template>
		<template #b>
			Draw the Hasse diagram of this order.
		</template>
		<template #c>
			Determine all pairs of incomparable elements.
		</template>
	</MakeProblem>
</template>
