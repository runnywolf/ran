<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			If $\dot{x}$ is the least‑squares solution of the linear system $Ax = b$. Which are correct?
		</template>
		<template #A>$\dot{x} = (A^T A)^{-1} A^T b$.</template>
		<template #B>If $A^T A$ is not invertible, then $\dot{x}$ is not existed.</template>
		<template #C>$\dot{x}$ is not unique.</template>
		<template #D>If $b \in \text{Col}(A)$, then $\dot{x} = x$.</template>
		<template #E>$\dot{x} = R^{-1} Q^T b$ for any $A$.</template>
	</MakeProblem>
</template>
