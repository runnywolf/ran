<template>
	<MakeProblem scoreText="">
		<template #problem>
			Which of the following statements regarding the cost of methods for solving an $n \times n$ linear system $A x = b$ are true?
			A. The cost of computing the LU factorization is generally proportional to $n^2$.
			B. The cost of backward substitution on a dense upper triangular matrix is generally proportional to $n^2$.
			C. If a matrix $A$ has no more than 3 non-zero entries per row, the cost of each iteration of the Jacobi method is proportional to $n$.
			D. If a matrix $A$ has no more than 3 non-zero entries per row, the cost of each iteration of the Jacobi method is proportional to $n^3$.
			E. None.
		</template>
	</MakeProblem>
</template>
