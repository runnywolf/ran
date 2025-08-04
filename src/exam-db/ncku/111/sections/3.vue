<template>
	<MakeProblem scoreText="(10 points)">
		<template #problem>
			$A = \{ 5, 6, 7, 8 \} ,~ B = \{ u, v \} ,~ C = \{\}$, consider
			$$
			\begin{split}
			a &= | \text{PowerSet}(A) | \\
			b &= | A \times B | \quad ( \times \text{ is cross product} ) \\
			c &= | \text{PowerSet}(C) |
			\end{split}
			$$
			Please calculate $2^c + b + a$.
		</template>
	</MakeProblem>
</template>
