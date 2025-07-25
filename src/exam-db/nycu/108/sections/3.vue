<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(2 points)', '(5 points)', '(5 points)']">
		<template #problem>
			Let $C[-1, 1]$ be the vector space over $\mathbb{R}$ of all continuous functions defined on the interval $[-1, 1]$.
			Let $V : \{ f(x) \in C[-1, 1] ~|~ f(x) = ae^x + be^{2x} + ce^{3x} ~,~ a, b, c \in \mathbb{R} \}$ .
		</template>
		<template #a>
			Prove that $V$ is a subspace of $C[-1, 1]$.
		</template>
		<template #b>
			Prove that $B = \{ e^x, e^{2x}, e^{3x} \}$ is a basis of $V$.
		</template>
		<template #c>
			Prove that $B' = \{ e^x - 2e^{3x},~ e^x + e^{2x} + 2e^{3x},~ 3e^{2x} + e^{3x} \}$ is a basis of $V$.
		</template>
	</MakeProblem>
</template>
