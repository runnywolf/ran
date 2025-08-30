<template>
	<MakeProblem scoreText="(15%)">
		<template #problem>
			Let $T: P_2(\mathbb{R}) \to P_2(\mathbb{R})$ be a linear operator that is defined according to
			$$T(g(x)) = g(x) + x \frac{dg(x)}{dx} + \frac{dg(x)}{dx} ~,$$
			in which $P_2(\mathbb{R})$ is a set of all polynomials
			with real‑value coefficients and degree $n,~ n = 0, 1, 2$.
			Please find the eigenvalues and the associated eigenvectors of the operator $5T + 2T^2 + T^{10}$.
		</template>
	</MakeProblem>
</template>
