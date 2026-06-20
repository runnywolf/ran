<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #problem>
			Let $\Sigma=\{0,1\}$ be an alphabet and $A=\{1,00,10\}$ be a subset of $\Sigma^*$.
		</template>
		<template #a>
			For each integer $n \ge 1$, let $a_n$ be the number of strings in $A^*$ of length $n$.
			Find and solve a recurrence relation for $a_n$.
		</template>
		<template #b>
			For each integer $n \ge 1$, let $b_n$ be the number of strings in $A^*$ which are of length $n$
			and exactly divided by 2 when we regard each of the strings as a binary number. Find $b_n$.
		</template>
	</MakeProblem>
</template>
