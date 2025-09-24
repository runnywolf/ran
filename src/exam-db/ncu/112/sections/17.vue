<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Consider the subspace $S$ of $\mathbb{R}^4$ spanned by the vectors:
			$$v_1 = @bm{ 1; 1; 1; 1 },~~ v_2 = @bm{ 1; 1; 2; 4 },~~ v_3 = @bm{ 1; 2; -4; -3 }.$$
			Apply the Gram‑Schmidt method starting from $v_1$, then $v_2$ and finally $v_3$
			to obtain the orthogonal basis of $S$:
			$$u_1 = @bm{ 1; 1; 1; 1 },~~ u_2 = @bm{ -1; a; b; c },~~ u_3 = @bm{ 1; d; e; f },$$
			where $a, b, c, d, e$ and $f$ are all integers (rounded to the nearest ones if necessary).
			What is $\text{mod}(|a+b+c+d+e+f|,~5)$, where $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
