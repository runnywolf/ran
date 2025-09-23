<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which are <span class="underline">sufficient but not necessary</span> conditions
			for the corresponding goals?
		</template>
		<template #A>
			“<span class="underline">Graph $G_1$ and $G_2$ are isomorphic</span>”
			for “<span class="underline">$G_1$ and $G_2$ both have Euler circuits</span>”.
		</template>
		<template #B>
			Growth order function $f$ and $g$, “<span class="underline">$g$ is $O(f)$ but not $\Theta(f)$</span>”
			for “<span class="underline">$g$ is $o(f)$</span>”.
		</template>
		<template #C>
			“<span class="underline">Existing an equivalence relation $R$ on set $S$</span>”
			for “<span class="underline">$S$ has a partition based on $R$</span>”.
		</template>
		<template #D>
			An infinite set of predicates $P$, “<span class="underline">Existing a well order on $P$</span>” for
			<span class="ran-no-break">
				“<span class="underline">using mathematic induction to prove all predicates in $P$</span>”.
			</span>
		</template>
		<template #E>
			“<span class="underline">$P$ is false</span>” for “<span class="underline">$P \to Q$ is true</span>”.
		</template>
	</MakeProblem>
</template>

<style scoped>
.underline {
  border-bottom: 1px solid black;
}
</style>
