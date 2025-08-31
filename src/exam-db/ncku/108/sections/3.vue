<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #problem>
			Let $p(x) = -x^3 + cx^2 + (c+3)x + 1$, where $c$ is a real number. Let
			$$C = \!\begin{bmatrix} c & c+3 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}$$
			and let
			$$A = \!\begin{bmatrix} -1 & 2 & -c-3 \\ 1 & -1 & c+2 \\ -1 & 1 & -c-1 \end{bmatrix}$$
		</template>
		<template #a>
			Compute the $A^{-1}CA$.
		</template>
		<template #b>
			Show that $C$ is the companion matrix of $p(x)$ and use the result from part (a)
			to prove that $p(x)$ will have only real roots regardless of the value of $c$.
		</template>
	</MakeProblem>
</template>
