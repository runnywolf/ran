<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				Which solves $a_n = -a_{n-1} + 6a_{n-2}$ for $a_n$ in terms of $a_0 = A$ and $a_1 = B$:
			</template>
			<template #A>$\frac{1}{5} [ (-3)^n(2A-B) + 2^n(3A+B) ]$</template>
			<template #B>$\frac{1}{5} [ (-3)^n(2A-B) + 2^n(3A-B) ]$</template>
			<template #C>$\frac{1}{5} [ (-2)^n(3A-B) + 3^n(2A+B) ]$</template>
			<template #D>$\frac{1}{5} [ (-2)^n(3A+B) + 3^n(2A+B) ]$</template>
			<template #E>$\frac{1}{5} [ (-2)^n(3A-B) + 3^n(2A-B) ]$</template>
		</MakeProblem>
	</vk>
</template>
