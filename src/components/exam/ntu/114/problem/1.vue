<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(5%)</span>
			Which ones of the following directed graphs are Eulerian? _______
		</div>
		<div class="column ts-grid is-compact opt">
			<div class="ts-wrap is-vertical is-middle-aligned is-compact">
				<img src="./img/1-a.webp">
				<span>(A)</span>
			</div>
			<div class="ts-wrap is-vertical is-middle-aligned is-compact">
				<img src="./img/1-b.webp">
				<span>(B)</span>
			</div>
			<div class="ts-wrap is-vertical is-middle-aligned is-compact">
				<img src="./img/1-c.webp">
				<span>(C)</span>
			</div>
			<div class="ts-wrap is-vertical is-middle-aligned is-compact">
				<img src="./img/1-d.webp">
				<span>(D)</span>
			</div>
			<div class="ts-wrap is-vertical is-middle-aligned is-compact">
				<img src="./img/1-e.webp">
				<span>(E)</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.opt > div {
	width: 280px; height: 230px;
	--gap: 0;
}
.opt > div > img {
	width: 250px;
}
</style>
