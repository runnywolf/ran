<template>
	<MakeProblem scoreText="(10%)" listEndLabel="e">
		<template #problem>
			Your answer will be considered correct only if all the true statements are selected.<br>
			Let $A$ be an $n \times n$ matrix.
		</template>
		<template #a>
			If $x_1$ and $x_2$ are the eigenvectors of $A$, then $x_1 + x_2$ is also an eigenvector of $A$.
		</template>
		<template #b>
			If $A^T = -A$, then $A$ is singular.
		</template>
		<template #c>
			If $A^2 = A$. $(A + I)^n = I + (2^n + 1)A$.
		</template>
		<template #d>
			If $A = A^T$, then $A$ is diagonalizable.
		</template>
		<template #e>
			If $A = \!\begin{bmatrix} B & C \\ O & D \end{bmatrix}\!$ and $B$ and $D$ are invertible,
			then $A^{-1} = \!\begin{bmatrix} B^{-1} & -B^{-1}CD^{-1} \\ O & D^{-1} \end{bmatrix}\!$.
		</template>
	</MakeProblem>
</template>
