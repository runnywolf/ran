<template>
	<MakeProblem scoreText="(8 points)">
		<template #problem>
			Let $V$ be the vector space of $2 \times 2$ matrices with real entries,
			and $P_3$ the vector space of real polynomials of degree 3 or less.
			Define the linear transformation $T : V \to P_3$ by
			$$
			T \left( \begin{bmatrix} a & b \\ c & d \end{bmatrix} \right)
			= 2a + (b - d)x - (a + c)x^2 + (a + b - c - d)x^3 .
			$$
			Find the rank and nullity of $T$.
		</template>
	</MakeProblem>
</template>
