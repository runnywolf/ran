<template>
	<MakeProblem listEndLabel="e">
		<template #problem>If $A$ is a $n \times n$ matrix with real entries.</template>
		<template #a>$A$ may have zero eigenvalues and eigenvectors.</template>
		<template #b>$A$ has only real eigenvalues if $A$ is symmetric.</template>
		<template #c>$A$ can always be diagonalizable if $A$ is symmetric.</template>
		<template #d>$A$ can always be spectral decomposed if $A$ is symmetric.</template>
		<template #e>$A^T A$ may have complex eigenvalues $a + ib$ and $a - ib$.</template>
	</MakeProblem>
</template>
