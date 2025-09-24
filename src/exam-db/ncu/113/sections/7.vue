<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			The subspace $U$ of $\mathbb{R}^4$ is spanned by the three vectors:
			$$
			v_1 = @bm{ 1; -1; -1; 1 } ,~~
			v_2 = @bm{ 1; 2; -3; 2 } ,~~
			v_3 = @bm{ 3; 3; 0; -2 } .
			$$
			Use the Gram‑Schmidt process to find the orthonormal basis of $U$:
			$$
			t_1 = @bm{ \frac{1}{2}; -\frac{1}{2}; -\frac{1}{2}; \frac{1}{2} } ,~~
			t_2 = @bm{ m; n; p; q } ,~~
			t_3 = @bm{ r; s; x; y } .
			$$
			$ d = @(){ \text{Round} \left\{ \cfrac{1}{n^2 s^2} \right\} } \% 5$. What is $d$?
			<br>($\%$ is the modulo operation. $\text{Round}\{ z \}$ rounds $z$ to the nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
