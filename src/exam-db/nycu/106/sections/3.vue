<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #problem>
			Assume that each person $i$ is asked to arbitrarily select $n_i$ different integer(s)
			from the range $\{ 1, 2, \cdots\! , r_i \}$.
		</template>
		<template #a>
			If $r_u = r_v = k$ for two persons $u$ and $v$, what is the maximal value of $k$
			(expressed in terms of $n_u,~ n_v$ and/or other constants if needed)
			that guarantees at least one common integer selected by both $u$ and $v$?
		</template>
		<template #b>
			If $r_u = 5,~ n_u = 3,~ r_v = 7,$ and $n_v = 3$,
			what is the number of combinations of $u\!$’s and $v\!$’s choices in which $u$ and $v$
			share exactly one common integer?
		</template>
	</MakeProblem>
</template>
