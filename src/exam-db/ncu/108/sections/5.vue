<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Consider Figure X below. Assume that Dijkstra’s algorithm is used to find the shortest path
			starting from node $a$. Which of the following statements is correct?
			<div class="ts-wrap is-vertical is-center-aligned is-compact" style="margin: 16px 0;">
				<img src="./img/5.webp">
				<div>Figure X</div>
			</div>
		</template>
		<template #A>The cost of the shortest path from $a$ to $z$ is $17$.</template>
		<template #B>
			In Dijkstra’s algorithm, after adding nodes $a$ and $c$, the next node to be added will be node $d$.
		</template>
		<template #C>The shortest path must contain the smallest number of edges.</template>
		<template #D>For each destination, there is only one possible shortest path.</template>
		<template #E>None of the above.</template>
	</MakeProblem>
</template>
