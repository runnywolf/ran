<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b">
		<template #problem>
			A self‑organizing <span class="ran-bold">ad‑hoc satellite network</span> consists of multiple satellites
			placed at arbitrary integer coordinates in 3‑dimensional space. Each satellite is modeled as a point
			$A_i \in \mathbb{Z}^3$. A <span class="ran-bold">secure communication link</span> may be established between
			satellites $A_i$ and $A_j$ only if the <span class="ran-bold">midpoint</span> of the segment $A_i A_j$
			also lies on an integer lattice point. Equivalently, all three coordinate‑wise averages must be integers:
			$$ \frac{x_i+x_j}{2} ,~ \frac{y_i+y_j}{2} ,~ \frac{z_i+z_j}{2} \in \mathbb{Z}. $$
			The Space Agency wants to guarantee that even without knowing the positions of the satellites beforehand,
			<span class="ran-bold">there must exist at least one secure link</span>.
		</template>
		<template #a>
			Determine the <span class="ran-bold">smallest integer </span>$N$ such that: No matter how the $N$ satellites
			are placed in $\mathbb{Z}^3$, <span class="ran-bold">there is always at least one pair</span> whose midpoint
			is a lattice point (i.e., at least one secure link always exists).
		</template>
		<template #b>
			Now modify the secure‑link condition:<br>
			A link is allowed if <span class="ran-bold">the total coordinate sum of the two satellites is even</span>, i.e.
			$$ x_i + x_j + y_i + y_j + z_i + z_j \equiv 0 \!\!\pmod{2}. $$
			Under this new rule, determine the <span class="ran-bold">new minimum number of satellites</span> guaranteeing
			that at least <span class="ran-bold">one secure link</span> must exist.
		</template>
	</MakeProblem>
</template>
