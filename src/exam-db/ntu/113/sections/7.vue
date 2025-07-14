<template>
	<vk>
		<MakeProblem scoreText="(10 points)">
			<template #problem>
				Consider the following sets $R$ and $S$ of quadruples of rational numbers:
				$$
				\begin{alignat*}{1}
				& R = \left\{
				\left( \frac{1}{3}, \frac{-2}{3}, \frac{1}{3}, 0 \right),
				\left( \frac{-3}{2}, 0, \frac{3}{2}, 0 \right)
				\right\} \\
				& S = \left\{ (1, 0, -1, 0), (1, -1, 0, 0), (-1, 1, 0, 1), (1, 0, -1, 1) \right\}.
				\end{alignat*}
				$$
				If $V$ (respectively, $\! W \!$) is the subspace of the rational quadruples spanned by
				<span class="ran-no-break">$R$ (respectively, $\! S \!$)</span>,
				then the subspace $U$ of the rational quadruples satisfying the following two conditions
				<table class="condition-table">
					<tbody>
						<tr>
							<td>
								$W = U \oplus V$ 
							</td>
							<td>
								(i.e., $W$ is the direct sum of $U$ and $V$)
							</td>
						</tr>
						<tr>
							<td>
								$U \perp V$
							</td>
							<td>
								(i.e., $U$ is orthogonal to $V$ with respect to the standard inner-product of $\mathbb{Q}$)
							</td>
						</tr>
					</tbody>
				</table>
				is _______.
			</template>
		</MakeProblem>
	</vk>
</template>

<style scoped>
.condition-table {
	margin: 16px 0;
}
.condition-table td {
	font-size: 18px;
}
</style>
