<template>
	<MakeProblem scoreText="(10%)" listEndLabel="e">
		<template #problem>
			Your answer will be considered correct only if all the true statements are selected.
		</template>
		<template #a>
			Suppose $\{u,v,w\}$ is linearly independent, then $\{u+v,~v+w,~w+u\}$ is also linearly independent.
		</template>
		<template #b>
			If two matrices $A$ and $B$ are similar, then they have the same eigenvalues.
		</template>
		<template #c>
			If two matrices $A$ and $B$ are similar, then they have the same eigenvectors.
		</template>
		<template #d>
			Let $V$ be a vector space of $m \times n$ matrices over $\mathbb{R}$.
			$\lang A, B \rang = \text{tr}(B^TA)$ defines an inner product in $V$.
		</template>
		<template #e>
			If $U$ and $W$ are subspaces of a finite‑dimensional inner product space $V$,
			then $(U + W)^\perp = U^\perp \cup W^\perp$.
		</template>
	</MakeProblem>
</template>
