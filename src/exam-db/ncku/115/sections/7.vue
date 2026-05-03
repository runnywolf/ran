<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #problem>
			Let $A \in \mathbb{R}^{m \times n}$ with $m \gt n$, and assume that $A$ is rank‑deficient,
			i.e., $\mathrm{rank}(A) \lt n$. $A^TA$ is positive semi‑definite.
		</template>
		<template #a>
			Let $\lambda \gt 0$. Show that the matrix $A^TA + \lambda I$ is positive definite.
		</template>
		<template #b>
			Derive the closed‑form solution for
			$$ x^* = \argmin_{x \in \mathbb{R}^n} \|Ax-b\|^2 + \lambda\|x\|^2,\quad \lambda \gt 0. $$
		</template>
	</MakeProblem>
</template>
