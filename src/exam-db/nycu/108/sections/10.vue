<template>
	<MakeProblem scoreText="(5 points)">
		<template #problem>
			Let $S$ be the set of all bit strings of length $n$.
			Let $\angle$ be a binary relation defined on $S$ such that $a ~\angle~ b$ if and only if
			$a$ and $b$ differ in exactly $k$ bit positions for any $a, b \in S$.
			Let $R = \{(a, b) \mid a ~\angle~ b,~ a, b \in S\}$.
			If we represent $R$ using a zero‑one matrix, how many 1’s are there in the matrix?
		</template>
	</MakeProblem>
</template>
