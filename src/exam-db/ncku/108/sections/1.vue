<template>
	<MakeProblem scoreText="(15%)">
		<template #problem>
			Two eigenvectors of this circulant matrix $C$ are $(1, 1, 1, 1)^T$ and $(1, i^3, i^6, i^9)^T$.
			What are the eigenvalues $\lambda_0$ and $\lambda_1$?
			$$
			\begin{bmatrix}
			c_0 & c_1 & c_2 & c_3 \\
			c_3 & c_0 & c_1 & c_2 \\
			c_2 & c_3 & c_0 & c_1 \\
			c_1 & c_2 & c_3 & c_0
			\end{bmatrix}\!
			\!\begin{bmatrix} 1 \\ 1 \\ 1 \\ 1 \end{bmatrix}\!
			= \lambda_0 \!\begin{bmatrix} 1 \\ 1 \\ 1 \\ 1 \end{bmatrix}
			\quad \text{and} \quad
			\!\begin{bmatrix}
			c_0 & c_1 & c_2 & c_3 \\
			c_3 & c_0 & c_1 & c_2 \\
			c_2 & c_3 & c_0 & c_1 \\
			c_1 & c_2 & c_3 & c_0
			\end{bmatrix}\!
			\!\begin{bmatrix} 1 \\ i^3 \\ i^6 \\ i^9 \end{bmatrix}\!
			= \lambda_1 \!\begin{bmatrix} 1 \\ i^3 \\ i^6 \\ i^9 \end{bmatrix}$$
		</template>
	</MakeProblem>
</template>
