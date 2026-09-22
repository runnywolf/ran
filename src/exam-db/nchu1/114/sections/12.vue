<template>
	<MakeProblem listEndLabel="D" useSpanList>
		<template #problem>
			In $\mathbb{R}^3$, please find the orthogonal projection vector $w$ of $v=@bm{1;3;4}$ onto the
			subspace $W$, where the subspace $W$ is defined as: $x_1-x_2+2x_3=0$.
		</template>
		<template #A>$@bm{1;4;-2}$</template>
		<template #B>$@bm{0;4;2}$</template>
		<template #C>$@bm{0;2;4}$</template>
		<template #D>$@bm{1;4;2}$</template>
	</MakeProblem>
</template>
