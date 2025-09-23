<template>
	<MakeProblem scoreText="">
		<template #problem>
			"The following matrix $A$ is the transformation matrix of a linear operator A. Find the linear transformation matrix $B$ that represents the linear operator A relative to the basis $[1, 1, 0]^T$, $[0, 1, 1]^T$ and $[1, 2, 2]^T$.
			$$A =
			\begin{bmatrix}
			1 & 3 & 1 \\
			2 & 5 & -4 \\
			1 & -2 & 2
			\end{bmatrix}$$
			'b' is obtained by summing up all the elements in $B$, taking the absolute value and then rounding to the nearest integer. What is the value of mod($b, 5$), where mod(.) is the modulo operator?
			A) 0 B) 1 C) 2 D) 3 E) 4"
		</template>
	</MakeProblem>
</template>
