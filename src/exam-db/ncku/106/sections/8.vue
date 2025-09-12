<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(5%)', '(5%)', '(5%)']">
		<template #problem>
			Let $(\mathbb{Q}, \oplus, \otimes)$ denote the <span class="ran-bold">field</span>,
			where $\oplus$ and $\otimes$ are defined by
			$$
			\begin{gather*}
			\begin{split}
			a \oplus b &= a + b - k, \\
			a \otimes b &= a + b - (ab/m),
			\end{split} \\
			\text{for fixed elements } k, m ~ (\neq 0) \text{ of } \mathbb{Q}.
			\end{gather*}
			$$
			Determine the values for $k$ and $m$ in each of the following:
		</template>
		<template #a>
			The zero element for the field is $5$.
		</template>
		<template #b>
			The additive inverse of the element $8$ is $-7$.
		</template>
		<template #c>
			The multiplicative inverse of $3$ is $1/6$.
			<span class="problem-score"><br>(no score if you give no details.)</span>
		</template>
	</MakeProblem>
</template>
