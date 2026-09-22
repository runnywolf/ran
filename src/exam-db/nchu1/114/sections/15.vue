<template>
	<MakeProblem listEndLabel="D">
		<template #problem>
			Which of the following statement is <span class="ran-bold">False</span>?
		</template>
		<template #A>
			For any matrix $A$, $\text{Col}(A)^\perp=\text{Null}(A)$, where the
			$\text{Col}(A)^\perp$ refers to the orthogonal complement of the column space of $A$,
			and $\text{Null}(A)$ refers to the null space of $A$.
		</template>
		<template #B>
			If $W$ is a subspace of $\mathbb{R}^n$ and $u$ is a vector in $\mathbb{R}^n$, then the
			distance from $u$ to $W$ is $\lVert u - P_Wu \rVert$.
		</template>
		<template #C>
			For any inconsistent system of linear equations $Ax = b$, the vector $z$ for which
			$\lVert Az - b \rVert$ is minimized is unique, provided that the columns of $A$ are linearly independent.
		</template>
		<template #D>
			If $P$ and $Q$ are $n\times n$ orthogonal matrices, then $P Q^T$ is an orthogonal matrix.
		</template>
	</MakeProblem>
</template>
