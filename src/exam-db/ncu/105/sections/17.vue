<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $A$ be an $m \times n$ matrix with orthonormal columns.
			If $W$ is a subset of $\mathbb{R}^n$ and $W^\perp$ is the orthogonal complement of $W$, then
		</template>
		<template #a>
			If $w$ is in $\text{Nul}(A)$ (i.e., null space of $A$) and $v \cdot w = 0$,
			then $v$ is in $\text{Col}(A)$ <span class="ran-no-break">(i.e., column space of $A$)</span>.
		</template>
		<template #b>$W^\perp$ is always a subspace.</template>
		<template #c>$(W^\perp)^\perp = W$.</template>
		<template #d>If $v$ and $w$ is orthogonal, then $Av$ and $Aw$ is orthogonal.</template>
		<template #e>$m \geq n$.</template>
	</MakeProblem>
</template>
