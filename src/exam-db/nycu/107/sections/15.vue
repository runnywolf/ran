<template>
	<MakeProblem listEndLabel="4" :listItemScoreTexts="['(6 points)', '(6 points)', '(6 points)', '(7 points)']">
		<template #problem>
			Calculation
		</template>
		<template #1>
			Given a matrix
			$A = \!\begin{bmatrix} 1 & 0 & 3 & 1 \\ 1 & 2 & 1 & 12 \\ 0 & 3 & -3 & 0 \end{bmatrix}\!$.
			What is the projection of $x = \!\begin{bmatrix} -3 \\ 5 \\ 8 \\ 5 \end{bmatrix}\!$
			onto the row space of $A$.
		</template>
		<template #2>
			Find orthogonal vectors that form an ordered basis $B_1$, where
			$
			B_1 = \left\{
			\!\begin{bmatrix} b_{11} \\ b_{21} \\ 0 \end{bmatrix}\!,
			\!\begin{bmatrix} b_{12} \\ b_{22} \\ 3 \end{bmatrix}\!,
			\!\begin{bmatrix} b_{13} \\ b_{23} \\ -3 \end{bmatrix}\!
			\right\}
			$,
			of $\mathbb{R}^3$ by Gram‑Schmidt from the columns of $A$.
		</template>
		<template #3>
			Find the eigenvalues and the eigenvectors that form an ordered basis $B_2$, where
			$
			B_2 = \left\{
			\!\begin{bmatrix} c_{11} \\ 1 \\ c_{31} \end{bmatrix}\!,
			\!\begin{bmatrix} c_{12} \\ -1 \\ c_{32} \end{bmatrix}\!,
			\!\begin{bmatrix} c_{13} \\ c_{23} \\ 1 \end{bmatrix}\!
			\right\}
			$,
			of $\mathbb{R}^3$ of the matrix
			$\!\begin{bmatrix} 1 & 3 & 0 \\ 3 & 1 & 0 \\ 0 & 0 & -2 \end{bmatrix}\!$.
		</template>
		<template #4>
			Find the coordinate transition matrix from the basis $B_1$ to the basis $B_2$.
		</template>
	</MakeProblem>
</template>
