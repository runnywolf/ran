<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Consider a finite set $N$. Let $f: P(N) \to \R$ be a function from $P(N)$ to $\R$,
				where $P(N)$ is the power set of $N$ and $\R$ is the set of all real numbers.
			</template>
			<template #a>
				<span class="problem-score">[4 points]</span>
				What is the maximum cardinality of the range of $f$?
			</template>
			<template #b>
				<span class="problem-score">[4 points]</span>
				Suppose that for all $S_1, S_2 \subseteq N$ we have
				$f(S_1) + f(S_2) \leq f(S_1 \cup S_2) + f(S_1 \cap S_2)$.
				Prove that for all finite sets $C$ and $T$
				such that $C \subseteq T \subset N$ and $\forall i \in N - T$, we have
				$f(C \cup \{i\}) - f(C) \leq f(T \cup \{i\}) - f(T)$.
			</template>
		</MakeProblem>
	</vk>
</template>
