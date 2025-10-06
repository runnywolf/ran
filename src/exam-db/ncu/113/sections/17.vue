<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Suppose a set $S$, $|S| = 3$. Consider possible function $f: S \times S \to S$.
			Which of the following statements are true?
		</template>
		<template #a>number of possible $f$ is $3^6$.</template>
		<template #b>number of possible $f$ is $3^9$.</template>
		<template #c>number of 1‑to‑1 $f$ is $3!$.</template>
		<template #d>number of onto $f$ is $3^9 - (3 \cdot 2^9) + 3$.</template>
		<template #e>number of bijection $f$ is $1$.</template>
	</MakeProblem>
</template>
