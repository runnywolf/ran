<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Suppose $|A| = 8 ,~ |B| = 3$. Consider the number of possible functions $f: A \to B$.
		</template>
		<template #A>The number of possible $f$ is $3^8$.</template>
		<template #B>If $f$ is one‑to‑one, the number is $6$.</template>
		<template #C>If $f$ is onto, the number is $8^3$.</template>
		<template #D>The number of possible $f^{-1}$ is $0$.</template>
		<template #E>If $f$ is bijection, the number is $0$.</template>
	</MakeProblem>
</template>
