<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $A$ and $B$ be two matrices and $x$ be a column vector.
			Which of the following sub‑problems are correct?
		</template>
		<template #A>
			A symmetric matrix has real eigenvalues and is diagonalizable.
		</template>
		<template #B>
			If $A$ is diagonalizable and invertible, then $A^{-1}$ is also diagonalizable.
		</template>
		<template #C>
			If $A$ and $B$ are $m \times n$ matrices, and $A$ is invertible, then $AB$ is similar to $BA$.
		</template>
		<template #D>
			If $A$ and $B$ are diagonalizable, then $AB$ is also diagonalizable.
		</template>
		<template #E>
			If $A$ is a symmetric $n \times n$ matrix whose entries are all positive,
			then the quadratic form $x^T A x$ is positive definite.
		</template>
	</MakeProblem>
</template>
