<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			If $A_{n \times n}$ can be spectral decomposed,
			$A = \lambda_1 u_1 {u_1}^T + \lambda_2 u_2 {u_2}^T + \cdots + \lambda_m u_m {u_m}^T$,
			where $\lambda_i$ and $u_i$ are eigenvalues and eigenvectors of $A$.
		</template>
		<template #A>$A$ can be any square matrix.</template>
		<template #B>$m \le n$.</template>
		<template #C>If $\lambda_j$ is the least eigenvalue, then $\lambda_j \ge 0$.</template>
		<template #D>All $\lambda_i$ are different.</template>
		<template #E>All $u_i$ are orthonormal.</template>
	</MakeProblem>
</template>
