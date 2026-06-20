<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(10%)', '(10%)', '(10%)']">
		<template #problem>
			A bipartite graph is a graph whose vertices can be partitioned into two subsets $X$ and $Y$
			so that each edge has one end in $X$ and the other end in $Y$. A cycle of $G$ is a sequence of
			vertices $v_0, v_1, \cdots\!, v_l$ such that each vertex $v_i$ is distinct, except $v_0 = v_l$,
			and $v_{i-1}$ and $v_i$ are adjacent for each $i = 1, 2, \cdots\!, l$. The length of the cycle is $l$.
			A $k\!$‑cube is a graph whose vertices are binary strings of length $k$, for some integer $k \gt 0$.
			Two vertices are adjacent if and only if they differ in exactly one bit.
		</template>
		<template #a>
			Show that every $k\!$‑cube is bipartite by partitioning its vertices into $X$ and $Y$,
			and then show that every edge connects some vertex in $X$ and another vertex in $Y$.
		</template>
		<template #b>Show that a bipartite graph has no cycles of odd length.</template>
		<template #c>Show that if a graph has no cycles of odd length then it is bipartite.</template>
	</MakeProblem>
</template>
