<template>
	<MakeProblem>
		<template #problem>
			If $n \times n$ matrix $A$ is diagonalizable, then
			<table>
				<tbody>
					<tr><td>16. $0$ is not the eigenvalue of $A$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>17. $A$ has $n$ distinct eigenvalues.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>18. $A$ is invertible.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>19. $A^T$ is also diagonalizable.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>20. The diagonalization is unique.</td><td>(A) True &nbsp; (B) False</td></tr>
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
