<template>
	<MakeProblem
		scoreText="(15 points)"
		listEndLabel="c"
		:listItemScoreTexts="['(5 points)', '(5 points)', '(5 points)']"
	>
		<template #a>
			Let $P = \{2, \{(2)\}, \{(2), (2)\}, (2), (2, 2), \{2, (2), (2), 2\}, \{(2, 2), (2, 2), ((2), 2)\}\}$.
			How many elements are there in $2^P$ (which is the set of all subsets of $P$)?
		</template>
		<template #b>
			What is the definition of an infinite set $W$?
		</template>
		<template #c>
			Let $N$ be the set of natural numbers. Assume that we already know $N$ is an infinite set.
			Let $S = \{k/2^n ~|~ n = 0, 1, 2, \cdots ; k \in N\} .$
			Note that $/$ in this question is the division of real numbers. For example, $5/2 = 2.5$.
			Prove that $S$ is an infinite set strictly according to your definition of an infinite set.
		</template>
	</MakeProblem>
</template>
