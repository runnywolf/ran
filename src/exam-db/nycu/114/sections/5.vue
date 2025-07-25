<template>
	<MakeProblem scoreText="(6 points)" listEndLabel="b" :listItemScoreTexts="['(2 points)', '(4 points)']">
		<template #problem>
			Consider the following two graphs $G$ and $H$:
			<div class="ts-content is-horizontally-fitted ts-wrap is-middle-aligned is-dense">
				<span>$G$:</span>
				<img src="./img/5-g.webp">
				<span style="margin-left: 20px;">$H$:</span>
				<img src="./img/5-h.webp">
			</div>
		</template>
		<template #a>
			Are graphs $G$ and $H$ isomorphic?
		</template>
		<template #b>
			If they are isomorphic, please provide the isomorphism function
			(a mapping from the vertices of $G$ to the vertices of $H$ that preserves adjacency).
			If they are not, explain in detail why they are not isomorphic.
		</template>
	</MakeProblem>
</template>
