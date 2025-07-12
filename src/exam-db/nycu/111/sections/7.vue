<template>
	<MakeProblem scoreText="(6 points)">
		<template #problem>
			<ol class="ran-order-list is-lower-alpha">
				<li>
					<span class="problem-score">(3 points)</span>
					Let
					<vl exp="
						B = \!\begin{bmatrix}
						1 & -1 & 0 & 2 \\
						0 & 0 & 3 & 3 \\
						2 & 1 & 0 & 0 \\
						1 & 1 & 2 & 2
						\end{bmatrix}\!
					" />.
					Compute <vl exp="\det(B)" />.
				</li>
				<li>
					<span class="problem-score">(3 points)</span>
					Let <vl exp="Q" /> be an orthogonal matrix.
					Show that <vl exp="\det(Q)" /> is either <vl exp="1" /> or <vl exp="-1" />.
					<span style="font-size: 16px;">（不會寫請留白，答錯最多倒扣 2 分，扣至本題組 0 分為止。）</span>
				</li>
			</ol>
		</template>
	</MakeProblem>
</template>
