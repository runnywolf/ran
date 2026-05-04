<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $G$ be a simple planar graph with $n \ge 3$ vertices and $m$ edges. Which of the following statements are true?
		</template>
		<template #a>Every simple planar graph satisfies $m \le 3n - 6$.</template>
		<template #b>If every face in a planar embedding of $G$ has degree at least 4, then $m \le 2n - 4$.</template>
		<template #c>A planar graph may contain a subdivision of $K_5$ or $K_{3,3}$.</template>
		<template #d>Every planar graph contains a Hamiltonian cycle.</template>
		<template #e>Every planar graph can be properly colored using at most four colors.</template>
	</MakeProblem>
</template>
