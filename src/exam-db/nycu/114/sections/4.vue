<template>
	<MakeProblem
		scoreText="(7 points)"
		listEndLabel="d"
		:listItemScoreTexts="['(1 point)', '(1 point)', '(1 point)', '(4 points)']"
	>
		<template #problem>
			Consider the set $A = \{a, b, c, d, e\}$ and the relation $R$ on $A$ defined as follows:
			$R = \{(a, b), (b, c), (c, d), (d, e), (a, e)\}$.
		</template>
		<template #a>
			Is $R$ reflexive?
		</template>
		<template #b>
			Is $R$ symmetric?
		</template>
		<template #c>
			Is $R$ transitive?
		</template>
		<template #d>
			Does $R$ define a partial ordering? If not, what is the minimal number of
			ordered pairs that must be added to $R$ to make it a partial order?
		</template>
	</MakeProblem>
</template>
