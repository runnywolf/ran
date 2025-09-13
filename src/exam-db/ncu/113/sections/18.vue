<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Consider Josephus Problem, where $n$ people are placed clockwise around a circle,
			from $1, 2, \cdots\!,$ to $n$, $n$ is next to $1$; every second person is eliminated each step
			(so the first few eliminated are $2, 4, 6, \cdots$), until the last one, say $k$, is remained,
			we denote $J(n) = k$. $\forall n \gt 1,~ n \in \mathbb{N}$, Which of the followings are true?
		</template>
		<template #a>$J(n+1) = \frac{1}{2} J(n) + 1$</template>
		<template #b>$J(2n) = 2J(n) - 1$</template>
		<template #c>$J(2n+1) = 2J(n) - 1$</template>
		<template #d>$J(2n) = 2J(n) + 1$</template>
		<template #e>$J(2n+1) = 2J(n) + 1$</template>
	</MakeProblem>
</template>
