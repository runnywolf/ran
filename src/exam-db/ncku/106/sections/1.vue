<template>
	<MakeProblem scoreText="(15%)">
		<template #problem>
			Given $A$ and $p$, if
			$\lim\limits_{n \to \infty} A^n p = \!\begin{bmatrix} a \\ b \\ c \\ d \end{bmatrix}\!$.
			Please find $a, b, c, d$.
			$$
			A = \!\begin{bmatrix}
			1 & 2/5 & 1/10 & 0 \\
			0 & 3/10 & 1/2 & 0 \\
			0 & 0 & 1/5 & 0 \\
			0 & 3/10 & 1/5 & 1
			\end{bmatrix} ,\quad
			p = \!\begin{bmatrix} 0 \\ 1/2 \\ 1/2 \\ 0 \end{bmatrix}
			$$
		</template>
	</MakeProblem>
</template>
