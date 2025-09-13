<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			The subspace $U$ of $\mathbb{R}^4$ is spanned by the three vectors:
			$$
			v_1 = \!\begin{bmatrix} 1 \\ -1 \\ -1 \\ 1 \end{bmatrix}\! ,~
			v_2 = \!\begin{bmatrix} 1 \\ 2 \\ -3 \\ 2 \end{bmatrix}\! ,~
			v_3 = \!\begin{bmatrix} 3 \\ 3 \\ 0 \\ -2 \end{bmatrix}\! .
			$$
			Use the Gram‑Schmidt process to find the orthonormal basis of $U$:
			$$ \def\arraystretch{1.4}
			t_1 = \!\begin{bmatrix} \frac{1}{2} \\ -\frac{1}{2} \\ -\frac{1}{2} \\ \frac{1}{2} \end{bmatrix}\! ,~
			t_2 = \def\arraystretch{1} \!\begin{bmatrix} m \\ n \\ p \\ q \end{bmatrix}\! ,~
			t_3 = \!\begin{bmatrix} r \\ s \\ x \\ y \end{bmatrix}\! .
			$$
			$ d = \left( \text{Round} \left\{ \cfrac{1}{n^2 s^2} \right\} \right) \% 5$. What is $d$?
			<br>($\%$ is the modulo operation. $\text{Round}\{ z \}$ rounds $z$ to the nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
