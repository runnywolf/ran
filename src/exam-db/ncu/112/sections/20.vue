<template>
	<MakeProblem scoreText="">
		<template #problem>
			Find an orthogonal matrix $P$ that diagonalizes $A$ as shown below. That is,
			$$P^TAP = D,$$
			where $D$ is a diagonal matrix.
			$$A = \begin{bmatrix} 1 & -1 & 2 \\ -1 & 1 & 2 \\ 2 & 2 & 2 \end{bmatrix}$$
			The product of the three elements in the first row of $P$ is $b$. The product of the three elements in the main diagonal of $D$ is $d$. c is the rounding (or nearest) integer of $|b \times d \times 6|$. What is the value of mod(c,5), where mod(.) is the modulo operator?
			A)0 B) 1 C) 2 D) 3 E) 4
		</template>
	</MakeProblem>
</template>
