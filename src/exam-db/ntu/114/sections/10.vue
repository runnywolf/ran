<template>
	<MakeProblem scoreText="(10%)">
		<template #problem>
			Given
			<vl exp="
				A =
				\!\begin{bmatrix}
				2 & 1 & -2 & 2 & 0  \\
				2 & 3 & -4 & 2 & 5  \\
				1 & 1 & -1 & 0 & 2  \\
				0 & 0 & 0  & 4 & -1 \\
				0 & 0 & 0  & 2 & 1
				\end{bmatrix}\!
			" />
			and a polynomial <vl exp="f(x) = x^4 - 7x^3 + 13x^2 - 6x + 1" />.
			find the largest eigenvalue of <vl exp="f(A)" />.
		</template>
	</MakeProblem>
</template>
