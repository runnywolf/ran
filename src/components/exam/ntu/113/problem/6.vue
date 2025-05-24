<template>
	<MakeProblem scoreText="(10 points)">
		<template #problem>
			Consider a system of linear equations <vl exp="Ax=b" />
			with the following augmented coefficient matrix:
			<vl c exp="
				[A|b] =
				\!\left(
				\begin{array}{ccc|c}
				1 & 0 & -1 & 1 \\
				0 & 1 & 2 & 0 \\
				1 & -1 & -3 & 2
				\end{array}
				\right)\! .
			" />
			Let
			<vl c exp="S = \argmin_{x \in \mathbb{C}^3} \| Ax-b \| ." />
			That is, <vl exp="S" /> consists of the vectors <vl exp="x \in \mathbb{C}^3" />
			that minimize the standard norm (also known as <span class="ran-no-break">2-norm</span>
			or <vl exp="\! \ell^2 \!" />-norm) of the vector <vl exp="Ax-b \in \mathbb{C}^3" />.
			The square of the minimum standard norm of the vectors in <vl exp="S" /> is _______.
		</template>
	</MakeProblem>
</template>
