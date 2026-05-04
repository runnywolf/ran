<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $T: V \to W$ be a linear transformation between finite‑dimensional vector spaces over the same field.
			Which of the following statements are true?
		</template>
		<template #a>$T$ is injective if and only if $\ker(T) = \{0\}$.</template>
		<template #b>$T$ is surjective if and only if $\dim(V) = \dim(\mathrm{Image}(T))$.</template>
		<template #c>If $\{ v_1, \cdots\!, v_n \}$ is a basis of $V$, then $\{ T(v_1), \cdots\!, T(v_n) \}$ is a basis of $W$.</template>
		<template #d>If $\dim(V) = \dim(W)$ and $T$ is injective, then $T$ is surjective.</template>
		<template #e>The matrix representation of $T$ depends on the choice of bases for $V$ and $W$.</template>
	</MakeProblem>
</template>
