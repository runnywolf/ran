<template>
	<MakeProblem scoreText="(15%)" listEndLabel="c">
		<template #problem>
			Let $p, q$ be two distinct primes. We denote relation $xRy$ if $x$ divides $y$.
			Under this relation $R$, please determine
		</template>
		<template #a>
			the Hasse diagram of all positive divisors of $p^2 q^2$,
		</template>
		<template #b>
			glb $\!\{ pq, p^2 \}$,
		</template>
		<template #c>
			How many edges are there in the Hasse diagram of all positive divisors of $p^m q^2$, $m \in \mathbb{Z}^+$.
		</template>
	</MakeProblem>
</template>
