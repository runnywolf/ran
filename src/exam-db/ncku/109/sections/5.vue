<template>
	<MakeProblem scoreText="(20%)" listEndLabel="c" :listItemScoreTexts="['(6%)', '(7%)', '(7%)']">
		<template #problem>
			For $x,y$ belonging to the set of positive real numbers,
			consider the determinant $D_n$ of the $n$ by $n$ matrix $A_{n \times n}$.
		</template>
		<template #a>
			Find the recurrent relation for the value of $D_n$.
		</template>
		<template #b>
			Find the value of $D_n$ as a function of $n$, when $y=x$.
		</template>
		<template #c>
			Find the value of $D_n$ as a function of $n$, when $y=2x$.
			$$
			A_{n \times n} = \!\begin{bmatrix}
			y & x & 0 & \cdots & 0 & 0 \\
			x & y & x & \ddots & \vdots & \vdots \\
			0 & x & y & \ddots & 0 & 0 \rule{0em}{1.2em} \\
			\vdots & \ddots & \ddots & \ddots & x & 0 \rule{0em}{1.2em} \\
			0 & \cdots & 0 & x & y & x \rule{0em}{1.2em} \\
			0 & \cdots & 0 & 0 & x & y \rule{0em}{1.2em} \\
			\end{bmatrix}
			$$
		</template>
	</MakeProblem>
</template>
