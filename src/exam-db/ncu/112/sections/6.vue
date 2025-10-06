<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Consider a set $S$ of $n$ nodes interconnecting to form a graph $G$.
			If two nodes <span class="ran-no-break">“directly connect”</span> to each other,
			there is an undirected edge between them.
			Let $D(a)$ denote the degree of a node $a$. Which of the following are correct statements?
		</template>
		<template #A>
			If $G$ is connected, there must be a simple path of length $n$.
		</template>
		<template #B>
			$\sum\limits_{i \in S} D(i)$ is even.
		</template>
		<template #C>
			If $G$ is connected, $\sum\limits_{i \in S} D(i) \ge 2n$.
		</template>
		<template #D>
			“$\exist \, a, b, (a ≠ b) \land (D(a) = D(b))$” is true.
		</template>
		<template #E>
			If $G$ is connected, the transitive and reflexive closure of “direct connecting”
			relation can form a complete graph.
		</template>
	</MakeProblem>
</template>
