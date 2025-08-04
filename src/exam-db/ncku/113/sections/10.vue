<template>
	<MakeProblem listEndLabel="e" :listItemScoreTexts="['(2%)', '(2%)', '(2%)', '(2%)', '(2%)']">
		<template #problem>True or False</template>
		<template #a>
			Every positive definite matrix is invertible.
		</template>
		<template #b>
			The determinant of $A - B$ equals $\det A - \det B$.
		</template>
		<template #c>
			If $u$ is orthogonal to every vector of a subspace $W$, then $u = 0$.
		</template>
		<template #d>
			If $A$ is square and $Ax = b$ is inconsistent for some vector $b$, then the nullity of $A$ is zero.
		</template>
		<template #e>
			If there is a basis for $\mathbb{R}^n$ consisting of eigenvectors of an $n \times n$ matrix $A$,
			then $A$ is diagonalizable.
		</template>
	</MakeProblem>
</template>
