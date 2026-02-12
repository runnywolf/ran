<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #a>
			For $n \ge 1$, let $a_n$ count the number of binary strings of length $n$,
			where there are no consecutive 0’s. Find and solve a recurrence relation for $a_n$.
		</template>
		<template #b>
			For $n \ge 1$, let $b_n$ count the number of binary strings of length $n$,
			where there are no consecutive 1’s and the last bit of the string is 0.
			Find and solve a recurrence relation for $b_n$.
		</template>
	</MakeProblem>
</template>
