<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				$\, R$ is a non&#8209;symmetric relation on $A$ if there exist $x, y \in A$ such that $(x, y) \in R$
				but $(y, x) \notin R$. If $|A| = m$, how many non&#8209;symmetric relations on $A$ are there?
			</template>
			<template #A>$2^{(m^2-m)/2}$</template>
			<template #B>$2^{m^2} - 2^{(m^2+m)/2}$</template>
			<template #C>$3^{(m^2-m)/2}$</template>
			<template #D>$2^{(m^2+m)/2}$</template>
			<template #E>$2^{m^2-m}$</template>
		</MakeProblem>
	</vk>
</template>
