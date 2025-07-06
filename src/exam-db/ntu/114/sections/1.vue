<template>
	<MakeProblem scoreText="(5%)" :extraProblemSlotNames="['img-options']">
		<template #problem>
			Which ones of the following directed graphs are Eulerian? _______
		</template>
		<template #img-options>
			<div class="ts-grid is-compact opt">
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
		</template>
	</MakeProblem>
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
