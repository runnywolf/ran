<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $W$ be a subspace of $\mathbb{R}^n$ with an orthogonal basis $\{ w_1, \cdots\!, w_p \}$
			and let $\{ v_1, \cdots\!, v_q \}$ be an orthogonal basis for $W^\perp$.
		</template>
		<template #A>$\{w_1, \cdots\!, w_p, v_1, \cdots\!, v_q\}$ is an orthogonal set.</template>
		<template #B>$\text{span} \{w_1, \cdots\!, w_p, v_1, \cdots\!, v_q\} = \mathbb{R}^n$.</template>
		<template #C>$\dim(W) + \dim(W^\perp) = n$.</template>
		<template #D>$x \in W \cup W^\perp$ for any $x$ in $\mathbb{R}^n$.</template>
		<template #E>$W \cap W^\perp = \varnothing$ (empty set).</template>
	</MakeProblem>
</template>
