<template>
	<MakeProblem scoreText="(6 points)">
		<template #problem>
			Given a matrix
			$$ A = \!\begin{bmatrix} 1 & 2 & 2 & 1 \\ 2 & 4 & 5 & 3 \\ -1 & -2 & 2 & 3 \\ \end{bmatrix}\! ,$$
			we can split $x = \!\begin{bmatrix} 5 \\ 1 \\ 1 \\ 4 \\ \end{bmatrix}\!$ into $x_r + x_n$,
			where $x_r \in C(A^T)$ and $x_n \in N(A)$. What are $x_r$ and $x_n$?
		</template>
	</MakeProblem>
</template>
