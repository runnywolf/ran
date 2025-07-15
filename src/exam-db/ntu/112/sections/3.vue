<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				The generating function in partial fraction decomposition for the recurrence equation
				$a_n = a_{n-1} + 6a_{n-2}$ for $a_n$ in terms of $a_0 = A$ and $a_1 = B$ is :
			</template>
			<template #A>$\frac{1}{5} [ \frac{2A+B}{1-3x} + \frac{3A-B}{1+2x} ]$</template>
			<template #B>$\frac{1}{5} [ \frac{2A+B}{1-3x} + \frac{3A+B}{1+2x} ]$</template>
			<template #C>$\frac{1}{5} [ \frac{2A-B}{1-3x} + \frac{3A-B}{1+2x} ]$</template>
			<template #D>$\frac{1}{5} [ \frac{3A-B}{1-2x} + \frac{2A-B}{1+3x} ]$</template>
			<template #E>$\frac{1}{5} [ \frac{3A+B}{1-2x} + \frac{2A-B}{1+3x} ]$</template>
		</MakeProblem>
	</vk>
</template>
