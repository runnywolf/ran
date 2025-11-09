<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Among the following options, which are <span class="ran-underline">necessary but not sufficient</span>
			conditions for the corresponding goals?
		</template>
		<template #a>
			“<span class="ran-underline">Existing an equivalence relation on a set $S$</span>” for
			“<span class="ran-underline">can form a partition on $S$</span>”.
		</template>
		<template #b>
			Between 2 graphs $G, H,$ both with $n$ nodes:
			“<span class="ran-underline">Existing same number of <span class="ran-no-break">length‑$\!1 \sim$ length‑$\!(n/2)$</span> paths</span>”
			for “<span class="ran-underline">$G$ is isomorphic to $H$</span>”.
		</template>
		<template #c>
			“<span class="ran-underline">Existing an 1‑to‑1 mapping from $A$ to $B$</span>” for
			“<span class="ran-underline">$A$ and $B$ have the same cardinality</span>”.
		</template>
		<template #d>
			“<span class="ran-underline">$P$ is true</span>” for “<span class="ran-underline">$P \to Q$ is true</span>”.
		</template>
		<template #e>
			“<span class="ran-underline">$R$ is a partial‑order set</span>” for
			“<span class="ran-underline">$R$ is a well‑ordered set</span>”.
		</template>
	</MakeProblem>
</template>
