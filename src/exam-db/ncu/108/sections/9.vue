<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $f: A \to B$ and $g: B \to C$ be functions. What following statements are true?
		</template>
		<template #A>If $g \circ f$ is one‑to‑one, so is $f$.</template>
		<template #B>If $g \circ f$ is one‑to‑one, so is $g$.</template>
		<template #C>If $g \circ f$ is onto, so is $f$.</template>
		<template #D>If $g \circ f$ is onto, so is $g$.</template>
		<template #E>If $g \circ f$ is a bijection, so are $g$ and $f$.</template>
	</MakeProblem>
</template>
