<template>
	<MakeProblem>
		<template #problem>
			If $A$ is a $m \times n$ matrix; $Ax = b$ is an inconsistent system and has a least‑square solution $\hat{x}$.
			<table>
				<tbody>
					<tr><td>26. $b$ is exactly not in $\text{Col}(A)$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>27. $\hat{x}$ is not a unique solution.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>28. If $A^T A$ is not invertible, then the system has no solution.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>29. $A \hat{x}$ is not always in $\text{Col}(A)$.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>30. $b - A \hat{x}$ is always in $\text{Nul}(A^T)$.</td><td>(A) True &nbsp; (B) False</td></tr>
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
