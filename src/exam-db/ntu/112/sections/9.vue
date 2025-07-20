<template>
	<vk>
		<MakeProblem scoreText="(5%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				Let $S, D,$ and $Q \in M_{n \times n}(\mathbb{R})$ represent a symmetric matrix, a diagonal matrix, and an
				orthogonal matrix. Assume that their degree of freedom are $d_S, d_D$ and $d_Q$, respectively.
				Find the value of $d_S - d_D - d_Q$.
			</template>
			<template #A>0</template>
			<template #B>1</template>
			<template #C>2</template>
			<template #D>3</template>
			<template #E>4</template>
		</MakeProblem>
	</vk>
</template>
