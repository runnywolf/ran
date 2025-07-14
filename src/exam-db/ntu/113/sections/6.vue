<template>
	<vk>
		<MakeProblem scoreText="(10 points)">
			<template #problem>
				Consider a system of linear equations $Ax=b$ with the following augmented coefficient matrix:
				$$
				[A|b] = \!\left( \begin{array}{ccc|c}
				1 & 0 & -1 & 1 \\
				0 & 1 & 2 & 0 \\
				1 & -1 & -3 & 2
				\end{array} \right)\! .
				$$
				Let
				$$S = \argmin_{x \in \mathbb{C}^3} \| Ax-b \| .$$
				That is, $S$ consists of the vectors $x \in \mathbb{C}^3$ that minimize the standard norm
				(also known as 2&#8209;norm or $\! \ell^2 \!$-norm) of the vector $Ax-b \in \mathbb{C}^3$.
				The square of the minimum standard norm of the vectors in $S$ is _______.
			</template>
		</MakeProblem>
	</vk>
</template>
