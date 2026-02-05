<template>
	<MakeProblem scoreText="(7 points)">
		<template #problem>
			A fully connected communication network on $n$ nodes is modeled by the complete graph $K_n$,
			where $n \ge 5$. Let $S \subseteq V(K_n) \cup E(K_n)$ be a set of failed nodes and links with $|S| \le n-3$,
			such that no failed link is incident to a failed node.
			Let $K_n - S$ denote the network obtained after removing all failed nodes (and their incident links)
			and all failed links. Prove by induction on $n$ that the remaining network $K_n - S$ contains a Hamiltonian cycle.
			<span class="ran-bold">You may not assume any characterization theorem for Hamiltonian graphs.</span>
		</template>
	</MakeProblem>
</template>
