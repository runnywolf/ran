<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b">
		<template #problem>
			Consider all simple (loop-free), undirected graphs on a set of
			<span class="ran-bold">5 distinct labeled vertices</span> $V = \{1,2,3,4,5\}$.
			Every edge connects two distinct vertices, and multiple edges are not allowed.
			Assume that <span class="ran-bold">no vertex is isolated</span> (i.e., every vertex has degree at least 1).
		</template>
		<template #a>
			How many such graphs have <span class="ran-bold">exactly one connected component</span>
			(i.e., the graph is <span class="ran-bold">connected</span>)?
		</template>
		<template #b>
			How many such graphs have <span class="ran-bold">exactly two connected components</span>?
		</template>
	</MakeProblem>
</template>
