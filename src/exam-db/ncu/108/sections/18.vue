<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			18. If $A$ is an matrix. Which are wrong?
			A. $A$ is invertible, thus $A = P D P^{-1}$, where $D$ is a diagonal matrix.
			B. $A$ is not a square matrix, thus $A$ can not be $Q R$ factorization.
			C. $A$ is not symmetric, thus $A$ can not be $P D P^T$ factorization.
			D. $A$ has $n$ distinct eigenvalues, thus $A = \lambda_1 u_1 u_1^T + \lambda_2 u_2 u_2^T + ... + \lambda_n u_n u_n^T$.
			E. $A$ is symmetric, thus $A = U \sum V^T$ (singular value decomposition).
		</template>
		<template #A></template>
		<template #B></template>
		<template #C></template>
		<template #D></template>
		<template #E></template>
	</MakeProblem>
</template>
