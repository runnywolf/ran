<template>
	<MakeProblem
		listEndLabel="j"
		:listItemScoreTexts="[
			'(1 point)', '(1 point)', '(1 point)', '(1 point)', '(1 point)',
			'(1 point)', '(1 point)', '(1 point)', '(1 point)', '(1 point)'
		]"
	>
		<template #problem>
			Answer true (T) or false (F) to each of the following statements.
		</template>
		<template #a>
			Let $L : \mathbb{R}^n \rightarrow \mathbb{R}^n$ be a linear operator.
			If $L(x_1) = L(x_2)$, then the vectors $x_1$ and $x_2$ must be equal.
		</template>
		<template #b>
			An orthogonal matrix must have an eigenvalue $\lambda = 1$.
		</template>
		<template #c>
			A Markov matrix must have an eigenvalue $\lambda = 1$.
		</template>
		<template #d>
			A projection matrix has only two eigenspaces and each is an orthogonal complement to the other.
		</template>
		<template #e>
			Singular matrices are never diagonalizable.
		</template>
		<template #f>
			For a real symmetric matrix, all of its eigenvalues are always real and
			all of its eigenvectors corresponding to different eigenvalues are always mutually orthogonal.
		</template>
		<template #g>
			For a square matrix, the product of its pivots is always equal to the product of its eigenvalues.
		</template>
		<template #h>
			A symmetric matrix cannot be similar to a non‑symmetric matrix.
		</template>
		<template #i>
			If $A A^T = A^T A$, then $A$ and $A^T$ always share the same eigenvalues.
		</template>
		<template #j>
			Singular values of any matrix are all nonnegative real numbers.
		</template>
	</MakeProblem>
</template>
