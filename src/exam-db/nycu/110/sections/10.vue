<template>
	<vk>
		<MakeProblem scoreText="(25 points)" :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #a>
				Determine.
				<ol class="ran-order-list is-lower-roman" style="margin-top: 6px; margin-bottom: 6px;">
					<li>
						<span class="problem-score">(1 points)</span> True (T) or false (F):<br>
						If $A$ is an invertible matrix, then $\det(A^{-1}) = [\det(A)]^{-1}$.
					</li>
					<li>
						<span class="problem-score">(1 points)</span> True (T) or false (F):<br>
						If $M$ is an $n \times n$ matrix and can be written in the form
						$$ M = \begin{pmatrix} A & B \\ O & C \end{pmatrix} , $$
						where $A, B, C, O$ are square matrices, and $O$ is all zero matrix. Then
						$\det(M) = \det(A) \cdot \det(C)$.
					</li>
					<li>
						<span class="problem-score">(3 points)</span>
						Find the determinant of the following matrix:
						$$
						\begin{bmatrix}
						2 & 0 & -1 & 1 & 3 \\
						0 & -1 & 0 & -2 & 0 \\
						2 & 1 & 4 & 0 & 3 \\
						2 & -1 & -1 & -3 & 3 \\
						0 & 2 & 0 & 3 & 1 
						\end{bmatrix} .
						$$
					</li>
				</ol>
			</template>
			<template #b>
				<span class="problem-score">(10 points)</span>
				Given a sequence $7,~ -6,~ 20,~ -24,~ 64,~ -96,~ \cdots$ comes from $G_{k+3} = -2G_{k+2} + 2G_{k+1} + 4G_k$
				for $k \ge 0$, with $G_0 = 7,~ G_1 = -6$ and $G_2 = 20$. Please find the number $G_{100}$.
			</template>
			<template #c>
				<span class="problem-score">(10 points)</span>
				Prove <span class="ran-bold">generally</span> that eigenvectors of an $n \times n$ matrix corresponding
				to distinct eigenvalues are linearly independent.
				Notice that the number of distinct eigenvalues $k$ is not necessarily equal to $n$
				(i.e. a general case with $k \leq n$).
				<span class="problem-score">
					(Please leave it blank if you don’t know the correct answer, or you will get
					<span class="ran-bold">at most minus 5 points</span> for the wrong answer.
					<span style="font-size: 16px;">不會寫請留白，答錯最多倒扣 5 分，扣至本題組 0 分為止。)</span>
				</span>
			</template>
		</MakeProblem>
	</vk>
</template>
