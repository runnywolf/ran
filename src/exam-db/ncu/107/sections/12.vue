<template>
	<MakeProblem listEndLabel="E">
		<template #problem>If $A$ is diagonalizable and has eigenvalue $\lambda$, then</template>
		<template #A>$A^{-1}$ has eigenvalue $1/\lambda$.</template>
		<template #B>$A^2$ has eigenvalue $2\lambda$.</template>
		<template #C>If $B$ has eigenvalue $\lambda$, then $A$ is similar $B$.</template>
		<template #D>$A$ has an eigenvector basis to span an eigenspace of $A$.</template>
		<template #E>$A = P D P^{-1}$, where matrices $P$ and $D$ are unique.</template>
	</MakeProblem>
</template>
