<template>
	<MakeProblem scoreText="(10%)" listEndLabel="E" useSpanList>
		<template #problem>
			The number of positive integer solutions of $x_1 + x_2 + \cdots + x_n = r$ equals
		</template>
		<template #A>$\binom{r-1}{n-1}$</template>
		<template #B>$\binom{n+r-1}{n-1}$</template>
		<template #C>$\binom{r}{n}$</template>
		<template #D>$r^n$</template>
		<template #E>$(rn)!$</template>
	</MakeProblem>
</template>
