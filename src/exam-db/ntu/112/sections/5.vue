<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				If $|A| = 2^4$ and $|B| = 2^3$, how many functions from $A$ to $B$ are there?
			</template>
			<template #A>$2^{7}$</template>
			<template #B>$2^{12}$</template>
			<template #C>$2^{32}$</template>
			<template #D>$2^{48}$</template>
			<template #E>$2^{3^{16}}$</template>
		</MakeProblem>
	</vk>
</template>
