<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $S = \{ V_1, V_2, V_3 \}$ and $T = \{ U_1, U_2, U_3 \}$ be the ordered bases for the vector space
			$\mathbb{R}^3$, where $V_1 = @bm{ -1; 2; 1 }$, $V_2 = @bm{ 0; 1; 0 }$, $V_3 = @bm{ -2; 2; 1 }$,
			and $U_1 = @bm{ -1; 1; 0 }$, $U_2 = @bm{ 0; 1; 1 }$, $U_3 = @bm{ 2; 1; 1 }$. For a vector $V$ in $\mathbb{R}^3$,
			the coordinate vector of $V$ with respect to the basis $T$ is $@bm{ 2; 3; 1 }$.
			The coordinate vector of $V$ with respect to the basis $S$ is $@bm{ M; N; P }$.
			What is $\text{mod}(\text{round}(|M+N+P|), 5)$?
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
