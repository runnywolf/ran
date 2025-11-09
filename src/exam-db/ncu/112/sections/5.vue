<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which are <span class="ran-underline">sufficient but not necessary</span> conditions
			for the corresponding goals?
		</template>
		<template #A>
			“<span class="ran-underline">Graph $G_1$ and $G_2$ are isomorphic</span>”
			for “<span class="ran-underline">$G_1$ and $G_2$ both have Euler circuits</span>”.
		</template>
		<template #B>
			Growth order function $f$ and $g$, “<span class="ran-underline">$g$ is $O(f)$ but not $\Theta(f)$</span>”
			for “<span class="ran-underline">$g$ is $o(f)$</span>”.
		</template>
		<template #C>
			“<span class="ran-underline">Existing an equivalence relation $R$ on set $S$</span>”
			for “<span class="ran-underline">$S$ has a partition based on $R$</span>”.
		</template>
		<template #D>
			An infinite set of predicates $P$, “<span class="ran-underline">Existing a well order on $P$</span>” for
			<span class="ran-no-break">
				“<span class="ran-underline">using mathematic induction to prove all predicates in $P$</span>”.
			</span>
		</template>
		<template #E>
			“<span class="ran-underline">$P$ is false</span>” for “<span class="ran-underline">$P \to Q$ is true</span>”.
		</template>
	</MakeProblem>
</template>
