<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Suppose the set of “valuable” problems is $V$, where each problem can be considered by human beings,
			and there is a bijection between $V$ and $\mathbb{R}$ (real number).
			Suppose the set of all A.I. softwares is $S$, where each software can solve exactly one problem.
			Each software can be represented as a long binary string (machine code).
			Which of the following statement are true?
		</template>
		<template #A>There is a bijection between $S$ and $\mathbb{R}$.</template>
		<template #B>A.I. can solve all valuable problems, it just takes a long time to do it.</template>
		<template #C>Without other restrictions, $|S|$ is $\infty$.</template>
		<template #D>$|V| \neq |S|$, and $|V| \gt |S|$.</template>
		<template #E>In terms of solving problems, A.I. may replace human beings someday.</template>
	</MakeProblem>
</template>
