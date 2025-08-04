<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(4 points)', '(6 points)']">
		<template #problem>
			Let $R$ and $B$ be sets of red and blue balls, respectively, with $m = |R|$ and $n = |B|$.
			Suppose that $m < n$. Let $G = (V, E)$ be a undirected graph with vertex set $V$ and
			edge set $E$ such that $V = R \cup B$ and $E = \{(u, v) \mid u \in R \text{ and } v \in B\}$.
			Let $E'$ be an edge cut of $G$ with the minimum number of edges.
		</template>
		<template #a>
			What is the value of $|E'|$?
		</template>
		<template #b>
			Let $G' = G - E'$. What is the value of $\sum\limits_{v \in G'} \deg(v)$,
			where $\deg(v)$ is the node degree of $v$?
		</template>
	</MakeProblem>
</template>
