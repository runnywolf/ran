<template>
	<MakeProblem scoreText="(10 points)">
		<template #problem>
			Consider the following sets <vl exp="R" /> and <vl exp="S" /> of quadruples of rational numbers:
			<vl c exp="
				\begin{alignat*}{1}
				& R = \left\{
				\left( \frac{1}{3}, \frac{-2}{3}, \frac{1}{3}, 0 \right),
				\left( \frac{-3}{2}, 0, \frac{3}{2}, 0 \right)
				\right\} \\
				& S = \left\{ (1, 0, -1, 0), (1, -1, 0, 0), (-1, 1, 0, 1), (1, 0, -1, 1) \right\}.
				\end{alignat*}
			" />
			If <vl exp="V" /> (respectively, <vl exp="\! W \!" />) is the subspace of
			the rational quadruples spanned by
			<span class="ran-no-break"><vl exp="R" /> (respectively, <vl exp="\! S \!" />)</span>,
			then the subspace <vl exp="U" /> of the rational quadruples satisfying the following two conditions
			<table class="condition-table">
				<tbody>
					<tr>
						<td>
							<vl exp="W = U \oplus V" /> 
						</td>
						<td>
							(i.e., <vl exp="W" /> is the direct sum of <vl exp="U" /> and <vl exp="V" />)
						</td>
					</tr>
					<tr>
						<td>
							<vl exp="U \perp V" />
						</td>
						<td>
							(i.e., <vl exp="U" /> is orthogonal to <vl exp="V" />
							with respect to the standard inner-product of <vl exp="\mathbb{Q}" />)
						</td>
					</tr>
				</tbody>
			</table>
			is _______.
		</template>
	</MakeProblem>
</template>

<style scoped>
.condition-table {
	margin: 16px 0;
}
.condition-table td {
	font-size: 18px;
}
</style>
