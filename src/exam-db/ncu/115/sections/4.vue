<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $V$ be a finite‑dimensional inner product space over $\mathbb{R}$, and let $u, v, w \in V$.
			Which of the following statements about orthogonality are true?
		</template>
		<template #a>If $u \perp v$ and $u \perp w$, then $u \perp (v + w)$.</template>
		<template #b>If $\{ v_1, v_2, \cdots\!, v_n \}$ is an orthogonal set of nonzero vectors, then it is linearly independent.</template>
		<template #c>Every set of orthonormal vectors forms a basis of the vector space.</template>
		<template #d>If $u \perp v$, then $\|u + v\|^2 = \|u\|^2 + \|v\|^2$.</template>
		<template #e>Two nonzero vectors $u$ and $v$ are orthogonal if and only if $\|u + v\| = \|u\| + \|v\|$.</template>
	</MakeProblem>
</template>
