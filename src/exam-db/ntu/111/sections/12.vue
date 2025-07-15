<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				Let $U = \text{span} \{ (1, 3, -2, 2, 3), (1, 4, -3, 4, 2), (2, 3, -1, -2, 9), (2, 4, -2, 0, 8) \}$
				and $W = \text{span} \{ (1, 3, 0, 2, 1), (1, 5, -6, 6, 3), (2, 5, 3, 2, 1), (2, 7, -3, 6, 3) \}$
				be two subspaces of $\mathbb{R}^5$. The dimension of $U \cap W$ is
			</template>
			<template #A>0</template>
			<template #B>1</template>
			<template #C>2</template>
			<template #D>3</template>
			<template #E>4</template>
		</MakeProblem>
	</vk>
</template>
