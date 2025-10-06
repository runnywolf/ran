<template>
	<MakeProblem>
		<template #problem>
			Suppose $\beta = \{ b_1, b_2 \}$ is a basis for $V$ and $C = \{ c_1, c_2, c_3 \}$ is a basis for $W$.
			Let $T: V \to W$ be a linear transformation with the standard matrix $A$ for $T$. If
			$$
			\beta = \left\{ @bm{1; -2} ,~ @bm{3; 4} \right\} ,\quad
			C = \left\{ @bm{1; -1; -3} ,~ @bm{-3; 4; 9} ,~ @bm{2; -2; 4} \right\} ,~
			\text{and } A = @bm{ 1, 1; 1, 1; 1, 1 } .
			$$
			Find the transformation matrix $M$ for $T$ relative to $\beta$ and $C$.
			<table>
				<tbody>
					<tr><td>21. $1,~ 2,~ 4$ are in the matrix $M$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>22. $1,~ -2,~ 4$ are in the matrix $M$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>23. $1,~ -2,~ -4$ are in the matrix $M$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>24. $7,~ 14,~ 28$ are in the matrix $M$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>25. $7,~ -14,~ 28$ are in the matrix $M$.</td><td>(A) True &nbsp; (B) False</td></tr>
				</tbody>
			</table>
		</template>
	</MakeProblem>
</template>

<style scoped>
table, tr, td, th {
  border: none;
	padding: 0;
}
table > tbody > tr > td:not(:first-child) {
	padding-left: 30px;
}
</style>
