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
			The linear transformation $T(f) = f'$ from $P_n$ to $P_n$ has rank $n$ for all positive integers $n$.
		</template>
		<template #b>
			For an $m \times n$ matrix $A,~ m > n,$ the nullity of $A^T$ must be larger than the nullity of $A$.
		</template>
		<template #c>
			If $U, V,$ and $W$ are subspaces of $\mathbb{R}^3,~ U \perp V,$ and $V \perp W,$ then $U \perp W$.
		</template>
		<template #d>
			For any matrix $A$, the eigenvalues of $A^T A$ are always nonnegative.
		</template>
		<template #e>
			There exist orthogonal $2 \times 2$ matrices $A$ and $B$ such that $A + B$ is orthogonal as well.
		</template>
		<template #f>
			If $AA^T = A^2$ for a $2 \times 2$ matrix $A$, then $A$ must be symmetric.
		</template>
		<template #g>
			If the eigenvalues of a matrix are not distinct, then this matrix is not diagonalizable.
		</template>
		<template #h>
			For a Hermitian matrix, its eigenvectors belonging to distinct eigenvalues
			are not only linearly independent but also orthogonal.
		</template>
		<template #i>
			An orthogonally diagonalizable matrix is always symmetric.
		</template>
		<template #j>
			Any two matrices with the same trace are similar.
		</template>
	</MakeProblem>
</template>
