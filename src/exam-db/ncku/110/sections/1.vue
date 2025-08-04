<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #a>
			Assume that each vertex has a unique id, how many different spanning trees in the following figure?
			<div class="ts-wrap is-center-aligned" style="margin: 10px 0;">
				<img src="./img/1.webp">
			</div>
		</template>
		<template #b>
			We can show that the set $\{(x, y) \mid x, y \in \mathbb{Z}^+ \}$ is countable by finding a 1‑1 mapping
			from $(x, y)$ to an integer. Given
			$$
			(1,1) \to 1 ,~~ (1,2) \to 2 ,~~ (1,3) \to 4 ,~~ (1,4) \to 7 ,~~ (2,1) \to 3 ,~~ \\
			(2,2) \to 5 ,~~ (2,3) \to 8 ,~~ (3,1) \to 6 ,~~ (3,2) \to 9 ,~~ (4,1) \to 10 ,
			$$
			please find which $(x,y)$ maps to $465$?
		</template>
	</MakeProblem>
</template>
