<template>
	<MakeProblem scoreText="(6 points)" listEndLabel="b" :listItemScoreTexts="['(3 points)', '(3 points)']">
		<template #a>
			Let
			$
			B = \!\begin{bmatrix}
			1 & -1 & 0 & 2 \\
			0 & 0 & 3 & 3 \\
			2 & 1 & 0 & 0 \\
			1 & 1 & 2 & 2
			\end{bmatrix}\!
			$.
			Compute $\det(B)$.
		</template>
		<template #b>
			Let $Q$ be an orthogonal matrix. Show that $\det(Q)$ is either $1$ or $-1$.
			<span class="problem-score">
				<span style="font-size: 16px;"><br>（不會寫請留白，答錯最多倒扣 2 分，扣至本題組 0 分為止。）</span>
			</span>
		</template>
	</MakeProblem>
</template>
