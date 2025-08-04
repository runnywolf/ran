<template>
	<MakeProblem scoreText="(10%)" listEndLabel="D">
		<template #problem>
			Which one of the following is false?
		</template>
		<template #A>
			If $A$ is an $m \times n$ matrix, then $A A^T$ and $A^T A$ have the same rank.
		</template>
		<template #B>
			If $Q$ is an orthogonal matrix, then $Q^T$ also is an orthogonal matrix.
		</template>
		<template #C>
			If $L : V \to V$ is a linear transformation and $L(v_1) = L(v_2)$,
			then $v_1 - v_2$ is in the kernel of $L$.
		</template>
		<template #D>
			If $A$ and $B$ are row equivalent matrices, then their determinants are equal.
		</template>
	</MakeProblem>
</template>
