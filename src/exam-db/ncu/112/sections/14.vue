<template>
	<MakeProblem scoreText="">
		<template #problem>
			Given a 4 by 4 matrix, $A$, as below, find its inverse matrix, $A^{-1}$.
			$$A =
			\begin{bmatrix}
			1 & 2 & 1 & -1 \\
			2 & 5 & 1 & -1 \\
			1 & 3 & 2 & 1 \\
			2 & 4 & 1 & -2
			\end{bmatrix}$$
			The sum of all the elements of $A^{-1}$ is $b$. Rounding $[b]$ to the nearest integer, $c$. What is the value of mod($c, 5$), where mod(.) is the modulo operation. (For example, mod(5,2)=1.)
			A) 0 B) 1 C) 2 D) 3 E) 4
		</template>
	</MakeProblem>
</template>
