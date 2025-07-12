<template>
	<MakeProblem scoreText="(25 points)">
		<template #problem>
			<ol class="ran-order-list is-lower-alpha">
				<li>
					<span class="problem-score">(6 points)</span>
					Project the vector <vl exp="b" /> onto the nullspace of <vl exp="A" />, where
					<vl c exp="
						b = \!\begin{bmatrix} -3 \\ -2 \\ 1 \\ 2 \\ 1 \end{bmatrix}\!
						~ \text{and} ~
						A = \!\begin{bmatrix}
						1 & 2 & 1 & 0 & 0 \\
						2 & 5 & 1 & 1 & 0 \\
						3 & 7 & 2 & 2 & -2 \\
						4 & 9 & 3 & -1 & 4
						\end{bmatrix}\! .
					" />
				</li>
				<li>
					Orthogonal Bases.
					<ol class="ran-order-list is-lower-roman">
						<li>
							<span class="problem-score">(8 points)</span>
							Apply the Gram-Schmidt process
							(<span class="ran-bold">Requirement: you must process following the column order</span>,
							i.e. first column first, then second column, etc.
							<span class="ran-bold">or you will get zero point</span>)
							to obtain orthonormal vectors from the columns of
							<vl c exp="
								A = \!\begin{bmatrix}
								1 & 4 & -2 & 2 \\
								2 & 1 & 3 & 2 \\
								-1 & 0 & -2 & 0 \\
								0 & 1 & -1 & 8
								\end{bmatrix}
							" />
						</li>
						<li>
							<span class="problem-score">(3 points)</span>
							As we known, the orthonormal vectors obtained from (i) cannot span <vl exp="\mathbb{R}^4" />.  
							We can add some additional orthonormal vectors to those obtained from (i)
							and the new set of orthonormal vectors will span <vl exp="\mathbb{R}^4" />,  
							and what are the additional orthonormal vectors?
						</li>
					</ol>
				</li>
				<li>
					<span class="problem-score">(8 points)</span>
					Let <vl exp="A" /> be an <vl exp="m" /> by <vl exp="n" /> matrix.
					Show that nullspace <vl exp="N(A^T A) = N(A)" />.
					(Please leave it blank if you don't know the correct answer, or you will get
					<span class="ran-bold">at most minus 5 points</span>
					for the wrong answer.
					<span style="font-size: 16px;">不會寫請留白，答錯最多倒扣 5 分，扣至本題組 0 分為止。)</span>
				</li>
			</ol>
		</template>
	</MakeProblem>
</template>
