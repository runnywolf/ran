<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $G$ be a connected simple graph with $n \ge 3$ vertices. Which of the following statements are correct?
		</template>
		<template #a>If $G$ has a Hamiltonian cycle, then $G$ has no cut vertex.</template>
		<template #b>If $G$ has no cut vertex, then $G$ is Hamiltonian.</template>
		<template #c>Every Hamiltonian graph is 2‑connected.</template>
		<template #d>There exists a Hamiltonian graph that is not 3‑connected.</template>
		<template #e>A graph with minimum degree at least 2 must be Hamiltonian.</template>
	</MakeProblem>
</template>
