<template>
	<MakeProblem listEndLabel="d" :listItemScoreTexts="['(3%)', '(3%)', '(3%)', '(3%)']">
		<template #problem>True or False</template>
		<template #a>
			If $A$ is an $n \times n$ matrix whose eigenvalues are all nonzero, then $A$ is nonsingular.
		</template>
		<template #b>
			If $A$ is a $5 \times 5$ matrix of rank 1 and $\lambda = 0$
			is an eigenvalue of multiplicity 4, then $A$ is diagonalizable.
		</template>
		<template #c>
			If $A$ and $B$ are row equivalent matrices, then their determinants are equal.
		</template>
		<template #d>
			If $A$ is an invertible $n \times n$ matrix, then $\text{rank}(A^T) = 0$.
		</template>
	</MakeProblem>
</template>
