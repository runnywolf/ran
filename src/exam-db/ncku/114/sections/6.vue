<template>
	<MakeProblem scoreText="(10%)" listEndLabel="D">
		<template #problem>
			Consider the following matrix. Which condition must the scalars $x_1, x_2, x_3$
			satisfy for the matrix to be nonsingular?
			$$A = \!\begin{bmatrix} 1 & x_1 & {x_1}^2 \\ 1 & x_2 & {x_2}^2 \\ 1 & x_3 & {x_3}^2 \end{bmatrix}$$
		</template>
		<template #A>No two of the $x_i$ values are zero.</template>
		<template #B>All $x_i$ values are distinct.</template>
		<template #C>No $x_i$ can be zero.</template>
		<template #D>No $x_i$ can be a scalar multiple of the other $x_j$.</template>
	</MakeProblem>
</template>
