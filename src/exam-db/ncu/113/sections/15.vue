<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $G$ be a graph with at least three vertices.
		</template>
		<template #a>
			If there is a Hamiltonian path between any two vertices of $G$, $G$ must contain a Hamiltonian cycle.
		</template>
		<template #b>
			If, at every vertex $v$ in $G$, there is a Hamiltonian path which starts at $v$, $G$ must contain a Hamiltonian cycle.
		</template>
		<template #c>
			If there is an Eulerian trail (path) between any two vertices of $G$, $G$ must contain an Eulerian circuit.
		</template>
		<template #d>
			$K_{m,n}$ is Hamiltonian (a graph with a Hamiltonian cycle) if and only if $n > 1$ and $m = n$.
		</template>
		<template #e>
			$K_{m,n}$ is Eulerian (a graph with a Eulerian circuit) if and only if $m$ and $n$ are both odd.
		</template>
	</MakeProblem>
</template>
