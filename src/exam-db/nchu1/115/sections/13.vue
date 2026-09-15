<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $A,B \in M_n(\mathbb{R})$. Which of the following statements are FALSE?
		</template>
		<template #A>
			For any vectors $\mathbf{u},\mathbf{v} \in \mathbb{R}^n$,
			the dot product satisfies $\mathbf{u}^T\mathbf{v}=\mathbf{v}^T\mathbf{u}$.
		</template>
		<template #B>
			If $S$ is skew‑symmetric, then for every vector $x \in \mathbb{R}^n$, $x^TSx=0$.
		</template>
		<template #C>
			If $A$ and $B$ are symmetric matrices, then $AB$ is symmetric.
		</template>
		<template #D>
			If $AB$ is invertible, then both $A$ and $B$ are invertible.
		</template>
		<template #E>
			If $A$ is symmetric and invertible, then $A^{-1}$ is not symmetric.
		</template>
	</MakeProblem>
</template>
