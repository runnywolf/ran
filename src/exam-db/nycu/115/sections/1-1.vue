<template>
	<MakeProblem scoreText="(5 points)" listEndLabel="4">
		<template #problem>A $n\times n$ matrix $A$ is said to be nonsingular,</template>
		<template #1>if $A$ is non-invertible.</template>
		<template #2>if there exists a matrix $B$ such that $AB = BA = I$.</template>
		<template #3>if the determinates of $A$ is nonzero.</template>
		<template #4>if $Ax = 0$ where $x$ is nonzero vector.</template>
	</MakeProblem>
</template>
