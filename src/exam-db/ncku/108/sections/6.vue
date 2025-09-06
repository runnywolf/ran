<template>
	<MakeProblem scoreText="(20%)" listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #problem>
			Given the following figures (a) and (b).
			Assume the source node is a and the sink node is f.
			The label along the edge (or node) means the maximum capacity of the edge (or node).
			<div class="ts-wrap is-center-aligned" style="--gap: 30px; margin: 20px 0;">
				<div class="ts-wrap is-vertical is-center-aligned">
					<img src="./img/6-a.webp" style="height: 200px">
					<div>(a)</div>
				</div>
				<div class="ts-wrap is-vertical is-center-aligned">
					<img src="./img/6-b.webp" style="height: 200px">
					<div>(b)</div>
				</div>
			</div>
		</template>
		<template #a>
			Find the maximum flow from the source to the sink. And what is the corresponding minimum cut in figure (a).
		</template>
		<template #b>
			Find the maximum flow from the source to the sink. And what is the corresponding minimum cut in figure (a).
		</template>
	</MakeProblem>
</template>
