<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			If $A$ is an matrix. Which are wrong?
		</template>
		<template #A>
			$A$ is invertible, thus $A = P D P^{-1}$, where $D$ is a diagonal matrix.
		</template>
		<template #B>
			$A$ is not a square matrix, thus $A$ can not be $Q R$ factorization.
		</template>
		<template #C>
			$A$ is not symmetric, thus $A$ can not be $P D P^T$ factorization.
		</template>
		<template #D>
			$A$ has $n$ distinct eigenvalues, thus
			$A = \lambda_1 u_1 {u_1}^T + \lambda_2 u_2 {u_2}^T + \cdots + \lambda_n u_n {u_n}^T$.
		</template>
		<template #E>
			$A$ is symmetric, thus $A = U \Sigma V^T$ (singular value decomposition).
		</template>
	</MakeProblem>
</template>
