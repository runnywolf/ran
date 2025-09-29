<template>
	<MakeProblem>
		<template #problem>
			If $C$ is a $n \times n$ covariance matrix, then
			<table>
				<tbody>
					<tr><td>31. $C$ always have $n$ orthogonal eigenvectors.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>32. $C$ always have $n$ distinct real eigenvalues.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>33. $C$ has positive and negative eigenvalues but no zero eigenvalues.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>34. $C$ can always be decomposed into $AA^T$, where $A$ is a matrix.</td><td>(A) True &nbsp; (B) False</td></tr>
					<tr><td>35. $C$ is exactly positive definite.</td><td>(A) True &nbsp; (B) False</td></tr>
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
	padding-left: 5px;
}
</style>
