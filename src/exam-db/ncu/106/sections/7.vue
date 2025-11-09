<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Suppose $x$ and $y$ are integer numbers, and we define the following predicates:
			$$ D(x, y): y \text{ is a multiple of } x; \quad E(x): x \text{ is even;} $$
			Which of the following clauses are correct interpretations of the logical statement:
			$$ \forall x, y,~ (E(x) \land \lnot E(y) ~\to~ \lnot D(x, y) \land \lnot D(y, x)) $$
		</template>
		<template #a>All even integers can only be a multiple of another non‑even integer.</template>
		<template #b>If $y$ is a multiple of $x$, it is not possible that $x$ is odd and $y$ is not even.</template>
		<template #c>It is possible that some not‑even number is not a multiple of some odd number.</template>
		<template #d>Some odd integer is not equal to an even integer.</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
