<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $G$ be a connected planar simple graph with $e$ edges and $v$ vertices, then
		</template>
		<template #A>
			$r = e+v-2$, where $r$ represents the number of regions in a planar representation of $G$.
		</template>
		<template #B>
			$e \le 3v-6$ when $v \ge 3$.
		</template>
		<template #C>
			$G$ has a vertex of degree not exceeding five.
		</template>
		<template #D>
			A graph is nonplanar if it contains a subgraph homeomorphic to $K_{2,3}$.
		</template>
		<template #E>
			A graph is nonplanar if it contains a subgraph homeomorphic to $K_5$.
		</template>
	</MakeProblem>
</template>
