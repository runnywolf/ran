<template>
	<MakeProblem scoreText="(10%)" listEndLabel="C" :listItemScoreTexts="['(2%)','(4%)','(4%)']">
		<template #problem>
			Let the vector $v = @bm{3;2;6} \in \mathbb{R}^3$, and the subspace
			$W = \left\{ @bm{a;b;b} ~\middle|~ a,b \in \mathbb{R} \right\}$.
		</template>
		<template #A>Please find the orthogonal basis for the subspace $W$.</template>
		<template #B>Please find the projection of the vector $v$ onto the subspace $W ,~ P_W(v)$.</template>
		<template #C>Please find the projection matrix $P_W$ for the subspace $W$.</template>
	</MakeProblem>
</template>
