<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(5%)', '(5%)', '(5%)']">
		<template #problem>
			Let
			$
			D = \def\arraystretch{1.2} \begin{bmatrix}
			2 & -1 \\
			-1 & 2 & -1 & & 0 \\
			& -1 & 2 & \ddots \\
			& & -1 & \ddots & -1 \\
			& 0 & & \ddots & 2 & -1 \\
			& & & & -1 & 2
			\end{bmatrix} \!
			\text{, i.e., }
			D(i, j) = \begin{cases}
			2, & \text{if } i = j. \\
			-1, & \text{if } |i - j| = 1. \\
			0, & \text{elsewhere}.
			\end{cases}
			$
		</template>
		<template #a>
			Use recurrence relations to express determinant of $D \text{, i.e., } |D|$.
		</template>
		<template #b>
			Find the general solution for $|D_n|$.
		</template>
		<template #c>
			$|D_1| = 2 ,~ |D_2| = \begin{vmatrix} 2 & -1 \\ -1 & 2 \end{vmatrix} = 3.$ Find $|D_{100}|$.
			<span class="problem-score"><br>(no score if you give no details.)</span>
		</template>
	</MakeProblem>
</template>
