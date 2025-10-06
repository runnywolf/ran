<template>
	<MakeProblem listEndLabel="E">
		<template #problem>$A$ and $B$ are two square matrices.</template>
		<template #A>If $A$ is similar to $B$, then $\det(A) = \det(B)$.</template>
		<template #B>If $A$ is similar to $B$, then $A$ and $B$ have the same eigenvectors.</template>
		<template #C>If $A$ is similar to $B$, then $A^2$ is similar to $B^2$.</template>
		<template #D>If $A$ is similar to $B$, then $AB$ is similar to $BA$.</template>
		<template #E>If $A^2$ is similar to $B^2$, then $A$ is similar to $B$.</template>
	</MakeProblem>
</template>
