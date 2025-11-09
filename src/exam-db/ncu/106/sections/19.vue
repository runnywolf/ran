<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			If $A$ is a $m \times n$ matrix;
			$A x = b$ is an inconsistent system and has a least‑square solution $\hat{x}$.
		</template>
		<template #a>$\hat{x} = (A^T A)^{-1} A^T b$.</template>
		<template #b>$\hat{x}$ is a unique solution.</template>
		<template #c>If $A^T A$ is not invertible, then the system has no solution.</template>
		<template #d>$A \hat{x}$ is not always in $\text{Col}(A)$.</template>
		<template #e>$b - A \hat{x}$ is orthogonal to every row of $A$.</template>
	</MakeProblem>
</template>
