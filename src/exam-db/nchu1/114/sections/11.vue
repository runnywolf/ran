<template>
	<MakeProblem listEndLabel="D" useSpanList>
		<template #problem>
			Suppose $T:\mathbb{R}^2\to\mathbb{R}^2$ is a linear transformation such that
			$T(@bm{3;2})=@bm{-4;11}$ and $T(@bm{-4;-4})=@bm{4;-8}$. Please find the standard matrix of
			linear transformation $T$.
		</template>
		<template #A>$@bm{-4,4;11,-8}$</template>
		<template #B>$@bm{3,-4;2,-4}$</template>
		<template #C>$@bm{-2,-1;7,5}$</template>
		<template #D>$@bm{-2,1;7,-5}$</template>
	</MakeProblem>
</template>
