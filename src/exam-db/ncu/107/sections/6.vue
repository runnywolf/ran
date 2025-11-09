<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following statements are true?
		</template>
		<template #A>
			If there exists an 1‑to‑1 mapping from set $A$ to $B$, then $|A| = |B|$.
		</template>
		<template #B>
			If there exists an equivalent relation on a set, a partition on that set always can be formed.
		</template>
		<template #C>
			If mathematical induction can be applied on a set of predicates, these predicates can form a total‑ordered set.
		</template>
		<template #D>
			$\forall n \gt 0$, if number of length‑$\!n$ paths are all the same in graph $G$ and $H$, then $G$ is isomorphic to $H$.
		</template>
		<template #E>
			When proving $f$ is $O(g)$, we must find the smallest $c,k$ such that $\forall x \gt k: f(x) \le cg(x)$.
		</template>
	</MakeProblem>
</template>
