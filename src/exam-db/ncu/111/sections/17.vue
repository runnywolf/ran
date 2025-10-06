<template>
	<MakeProblem listEndLabel="E">
		<template #problem>For a $n \times n$ real square matrix $A$. $\lambda_i \!$’s are eigenvalues of $A$.</template>
		<template #A>$\lambda_i \!$’s may be complex number.</template>
		<template #B>If some $\lambda_i = 0$, then $A$ is always not invertible.</template>
		<template #C>If some $\lambda_i \!$’s are the same, then $A$ is not diagonalizable.</template>
		<template #D>If $A = A^T$, then $\lambda_i \!$’s are positive real.</template>
		<template #E>
			If $A$ is diagonalizable, then $A$ has many different matrices $P$ and $D$ such that $A = P D P^{-1}$.
		</template>
	</MakeProblem>
</template>
