<template>
	<MakeProblem scoreText="(10%)" listEndLabel="j">
		<template #problem>
			<span class="ran-underline">True and False</span>. Mark ‘<span class="ran-bold">O</span>’
			if the statement is <span class="ran-underline">True</span> and mark ‘<span class="ran-bold">X</span>’
			if it is <span class="ran-underline">False</span>.
		</template>
		<template #a>
			Suppose $A \in \mathbb{R}^{n \times n}$. If $\text{trace}(A) = \alpha$,
			then $\text{trace}(A^{-1}) = 1/\alpha$.
		</template>
		<template #b>
			Suppose $A \in \mathbb{R}^{n \times n}$. If $A^2=A$,
			then $A=I$ (identity matrix) or $A=O$ (zero matrix).
		</template>
		<template #c>
			If $V$ is a subspace of dimension $k$, then any generating set for $V$ contains exactly $k$ vectors.
		</template>
		<template #d>
			Suppose that $A$ and $B$ are both $n \times n$ invertible matrices.
			If $A$ and $B$ are symmetric matrices, then $AB$ is symmetric.
		</template>
		<template #e>
			Suppose that $A$ and $B$ are both $n \times n$ invertible matrices.
			If $AB=I$, then the inverse of $B$ is $A$.
		</template>
		<template #f>
			Suppose the matrices $A,B \in \mathbb{R}^{n \times n}$. If $B$ is obtained from $A$ by adding
			a multiple of some row to a different row, then determinant of $A$ is equal to the determinant of $B$.
		</template>
		<template #g>
			If the equation $Ax=b$ is inconsistent, then the rank of $[A|b]$ is greater than the rank of $A$.
		</template>
		<template #h>
			If $A \in \mathbb{R}^{m \times n}$ ($A$ is an $m$ by $n$ matrix), then $A^T A$ is a symmetric matrix,
			but $(A+A^T)$ is a skew‑symmetric matrix.
		</template>
		<template #i>
			If $A$ is an $m$ by $n$ matrix and $A$ is diagonalizable,
			then $A$ must have $n$ distinct eigenvalues.
		</template>
		<template #j>
			If $R$ is an $n \times n$ matrix in reduced row echelon form that has rank $n$, then $R=I_n$.
		</template>
	</MakeProblem>
</template>
