<template>
	<MakeProblem scoreText="(10%)" listEndLabel="D">
		<template #problem>
			About the eigenvalues and the corresponding eigenspaces for the following matrix, which is wrong?
			$$\begin{bmatrix} 2 & 1 & 0 & 0 \\ 3 & 4 & 0 & 0 \\ 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$
		</template>
		<template #A>One of the eigenvalues is 1.</template>
		<template #B>The eigenspace corresponding to $\lambda = 5$ is $(0, 0, 1, 0)$.</template>
		<template #C>The largest eigenvalue is 5.</template>
		<template #D>There are multiple identical eigenvalues.</template>
	</MakeProblem>
</template>
