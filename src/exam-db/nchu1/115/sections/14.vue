<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $T: \mathbb{R}^3 \to \mathbb{R}^3$ be a linear transformation whose matrix in the standard basis is
			$$A=@pm{4,1,0;0,4,0;0,0,-2}.$$
			Which of the following statements are correct?
		</template>
		<template #A>The kernel of $T+2I$ has dimension 1.</template>
		<template #B>The range of $T-4I$ has dimension 1.</template>
		<template #C>The matrix $A$ is <span class="ran-bold">not</span> similar to any diagonal matrix.</template>
		<template #D>Any matrix similar to $A$ must have only one block for the eigenvalue $-2$.</template>
		<template #E>The eigenspace associated with eigenvalue 4 is a 2‑dimensional plane in $\mathbb{R}^3$.</template>
	</MakeProblem>
</template>
