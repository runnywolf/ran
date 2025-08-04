<template>
	<MakeProblem scoreText="(10%)" listEndLabel="E" useSpanList>
		<template #problem>
			$\, R$ is a non‑symmetric relation on $A$ if there exist $x, y \in A$ such that $(x, y) \in R$
			but $(y, x) \notin R$. If $|A| = m$, how many non‑symmetric relations on $A$ are there?
		</template>
		<template #A>$2^{(m^2-m)/2}$</template>
		<template #B>$2^{m^2} - 2^{(m^2+m)/2}$</template>
		<template #C>$3^{(m^2-m)/2}$</template>
		<template #D>$2^{(m^2+m)/2}$</template>
		<template #E>$2^{m^2-m}$</template>
	</MakeProblem>
</template>
