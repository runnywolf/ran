<template>
	<MakeProblem scoreText="(5%)" listEndLabel="e">
		<template #problem>
			Which of the following statements are true?
		</template>
		<template #a>
			If $A$ and $B$ are invertible matrices, then the matrix $C = A^{-1} + B^{-1}$ is also invertible.
		</template>
		<template #b>
			If $R$ is a rectangular matrix, then $A = R^T R$ is positive definite.
		</template>
		<template #c>
			Every orthogonal set is linearly independent.
		</template>
		<template #d>
			$T = \begin{pmatrix} T_{11} & T_{12} \\ 0 & T_{22} \end{pmatrix}$,
			where $T_{11}$ is a $p \times p$ matrix, $T_{22}$ is a $q \times q$ matrix,
			and $T_{12}$ is a $p \times q$ matrix.
			The set of eigenvalues of $T$ is the union of the sets of eigenvalues of $T_{11}$ and $T_{22}$.
		</template>
		<template #e>
			If $T: V \to W$ is a linear transformation with $V$ and $W$ are vector spaces over a field $F$.
			Then, $\text{ker}(T)$ is a vector space.
		</template>
	</MakeProblem>
</template>
