<template>
	<MakeProblem scoreText="(10%)">
		<template #problem>
			Solve for $t$ if
			$$
			\det\left( \begin{bmatrix}
			3 - t & 2 & 0 & 0 & 0 \\
			1 & 4 - t & 0 & 0 & 0 \\
			0 & 0 & 3 - t & 1 & 0 \\
			0 & 0 & 1 & 3 - t & 0 \\
			0 & 0 & 0 & 0 & 4 - t
			\end{bmatrix} \right) = 0.
			$$
		</template>
	</MakeProblem>
</template>
