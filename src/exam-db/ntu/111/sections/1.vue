<template>
	<MakeProblem scoreText="(10%)" listEndLabel="E" useSpanList spanListTopLabel>
		<template #problem>Which one of the following graphs has no Hamiltonian cycles?</template>
		<template #A>
			<img src="./img/1-a.webp">
		</template>
		<template #B>
			<img src="./img/1-b.webp">
		</template>
		<template #C>
			<img src="./img/1-c.webp">
		</template>
		<template #D>
			<img src="./img/1-d.webp">
		</template>
		<template #E>
			<img src="./img/1-e.webp">
		</template>
	</MakeProblem>
</template>

<style scoped>
img { /* 選項圖片 */
	width: 100px;
}
</style>
