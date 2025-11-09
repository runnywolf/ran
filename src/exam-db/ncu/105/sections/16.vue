<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			If $n \times n$ matrix $A$ has $r$ distinct eigenvalues
			$\lambda_1, \cdots\!, \lambda_r,~ r \lt n$, then
		</template>
		<template #a>$A$ is not diagonalizable.</template>
		<template #b>$A$ has at most $n$ eigenvectors.</template>
		<template #c>$A$ is not invertible.</template>
		<template #d>$A$ has at least $r$ linearly independent eigenvectors.</template>
		<template #e>The sum of two eigenvectors may also be an eigenvector of $A$.</template>
	</MakeProblem>
</template>
