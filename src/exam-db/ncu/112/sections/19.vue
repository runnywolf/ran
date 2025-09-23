<template>
	<MakeProblem scoreText="">
		<template #problem>
			Find the least squares solution of the system $Ax = b$, in which
			$$A = \begin{bmatrix} 1 & 0 & 1 \\ 1 & 1 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 0 \end{bmatrix}$$
			and $b=[4, -1, 0, 1]^T$.
			c is the rounding (or nearest) integer of the sum of the elements in $x$. What is the value of mod([c],5), where mod(.) is the modulo operator?
			A)0 B) 1 C) 2 D) 3 E) 4
		</template>
	</MakeProblem>
</template>
