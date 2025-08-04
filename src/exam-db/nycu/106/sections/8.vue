<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #a>
			Suppose $A$ is a $4$ by $5$ matrix and $B$ is a $5$ by $7$ matrix and $AB = 0$.
			If $\text{rank}(B) = 2$, what is the maximum possible $\text{rank}(A)$? and why?
		</template>
		<template #b>
			Let $u,~ v,$ and $w$ be vectors in $\mathbb{R}^n$.
			Suppose $A$ is the sum of three matrices: $A = uv^T + vw^T + wu^T$.
			If $x_1u + x_2v + x_3w = 0$ has a nonzero solution $(x_1, x_2, x_3)$,
			what is the maximum possible $\text{rank}(A)$? and why?
		</template>
	</MakeProblem>
</template>
