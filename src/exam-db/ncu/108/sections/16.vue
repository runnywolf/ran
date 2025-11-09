<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			If $A$ is square matrix with real entries and has eigenvalue $\lambda$. Which are correct?
		</template>
		<template #A>
			If $\lambda$ is a complex number $a+ib$, then $a-ib$ may be another eigenvalue.
		</template>
		<template #B>
			If $\lambda$ is a complex number, then the corresponding eigenvector must be a complex vector.
		</template>
		<template #C>$A$ is symmetric, then $\lambda$ is real.</template>
		<template #D>$A$ is symmetric, all eigenspaces are orthogonal.</template>
		<template #E>The eigenvalues of matrix $A^T A$ are arbitrary real number.</template>
	</MakeProblem>
</template>
