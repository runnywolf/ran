<template>
	<MakeProblem listEndLabel="e">
		<template #problem>If $Ax = b$ is an inconsistent system and $A$ is a $m \times n$ matrix.</template>
		<template #a>$A$ has only $r$ linearly independent columns, $r \lt n$.</template>
		<template #b>The least‑square solution of $A$ is $(A^T A)^{-1} A^T b$.</template>
		<template #c>$A$ may have no least‑square solution.</template>
		<template #d>
			If $u$ is a least‑square solution of $A$, then $(b-Au)$ is orthogonal to every row of $A$.
		</template>
		<template #e>
			If $A$ can be $QR$ factorized, then the least‑square solution can be calculated as $R^{-1} Q b$.
		</template>
	</MakeProblem>
</template>
