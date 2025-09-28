<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Given the directed graph in Figure 2. Which of the following statements are correct?
			<div class="ts-wrap is-vertical is-center-aligned is-compact" style="margin-top: 10px">
				<img src="./img/5.webp" style="height: 160px">
				<div>Figure 2: Directed graph $G$.</div>
			</div>
		</template>
		<template #A>$G$ is strongly connected.</template>
		<template #B>$G$ is weakly connected.</template>
		<template #C>$G$ has a Euler path.</template>
		<template #D>$G$ has a Hamilton path.</template>
		<template #E>$G$ is a planar graph.</template>
	</MakeProblem>
</template>
