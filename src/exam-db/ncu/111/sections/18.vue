<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			If $A$ is a $m \times n$ matrix and $A$ can be $QR$ factorized.
			$W$ is the set of all columns of $A$, and $W^\perp$ is the orthogonal complement of $W$, then
		</template>
		<template #A>$W$ is a subspace.</template>
		<template #B>$W^\perp$ is a subspace.</template>
		<template #C>$(W^\perp)^\perp = W$.</template>
		<template #D>$W \cap W^\perp = \varnothing$ (empty set).</template>
		<template #E>$m \geq n$.</template>
	</MakeProblem>
</template>
