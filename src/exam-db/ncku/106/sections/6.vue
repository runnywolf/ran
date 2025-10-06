<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(5%)', '(5%)', '(5%)']">
		<template #problem>
			Let
			$
			\def\arraystretch{1.2}
			D_n = { @bm{
			2, -1 \\
			-1, 2, -1,, 0 \\
			, -1, 2, \ddots \\
			,, -1, \ddots, -1 \\
			, 0,, \ddots, 2, -1 \\
			,,,, -1, 2
			} }_{n \times n}
			\text{, i.e., }
			D_n(i, j) = \begin{cases}
			2, & \text{if } i = j. \\
			-1, & \text{if } |i - j| = 1. \\
			0, & \text{elsewhere}.
			\end{cases}
			$
		</template>
		<template #a>
			Use recurrence relations to express determinant of $D_n$, i.e., $|D_n|$.
		</template>
		<template #b>
			Find the general solution for $|D_n|$.
		</template>
		<template #c>
			$|D_1| = 2 ,~ |D_2| = @vm{ 2, -1; -1, 2 } = 3.$ Find $|D_{100}|$.
			<span class="problem-score"><br>(no score if you give no details.)</span>
		</template>
	</MakeProblem>
</template>
<!-- [fix problem error] 這一題沒有說明方陣 $D$ 的長寬, 應改為 D_n 較合適 -->
