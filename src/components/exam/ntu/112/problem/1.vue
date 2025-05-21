<template>
	<MakeProblem :score="10" :extraProblemSlotNames="['img-options']">
		<template #problem>
			Which one of the following graphs has no Hamiltonian cycles?
		</template>
		<template #img-options>
			<div class="ts-wrap is-compact is-top-aligned opt">
				<span>(A)</span>
				<img src="./img/1-a.webp">
				<span>(B)</span>
				<img src="./img/1-b.webp">
				<span>(C)</span>
				<img src="./img/1-c.webp">
				<span>(D)</span>
				<img src="./img/1-d.webp">
				<span>(E)</span>
				<img src="./img/1-e.webp">
			</div>
		</template>
	</MakeProblem>
</template>

<style scoped>
.opt > img {
	width: 100px;
}
</style>
