<template>
	<MakeProblem scoreText="(10 points)">
		<template #problem>
			Find the orthogonal matrix $Q$ in which $q_{11} > 0$ and $q_{22} > 0$,
			and the diagonal matrix $D$ such that
			$$
			\!\begin{bmatrix} x & y \end{bmatrix}\! Q D Q^T \!\begin{bmatrix} x \\ y \end{bmatrix}\! = 6x^2 + 24xy - y^2 .
			$$
		</template>
	</MakeProblem>
</template>
