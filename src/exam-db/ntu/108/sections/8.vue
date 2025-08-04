<template>
	<MakeProblem scoreText="(10%)" :extraSlotNames="['statements']">
		<template #problem>
			How many of the following five statements are correct? ________
		</template>
		<template #statements>
			<div class="ts-list is-unordered" style="--gap: 6px">
				<div class="item">
					Let $V$ be a vector space. Let $S$ be a subset of $V$. Let $U$ be a subspace of $V$.
					If $S \subseteq U$, then $\text{span}(S) \subseteq U$.
				</div>
				<div class="item">
					If $R$ is a linearly dependent subset of a vector space,
					then $x \in \text{span}(R \setminus \{x\})$ holds for each vector $x \in R$.
				</div>
				<div class="item">
					Based on any consistent axiom set for set theory, any vector space admits a basis.
				</div>
				<div class="item">
					Based on the standard ZFC axioms for set theory, each inner‑product space admits an orthonormal basis.
				</div>
				<div class="item">
					For any complex vector spaces $V$ and $W$ with $\dim(W) \lt \infty$,
					if $T$ is a linear surjection from $V$ to $W$, then $\dim(V) = \text{nullity}(T) + \text{rank}(T)$.
				</div>
			</div>
		</template>
	</MakeProblem>
</template>
