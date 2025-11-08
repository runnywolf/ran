<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Which of the following statements are true?
		</template>
		<template #a>
			If $B$ is a matrix obtained by interchanging two rows or two columns of $A$, then $\det(B) = \det(A)$.
		</template>
		<template #b>
			If $B$ is a matrix obtained by multiplying each entry of some row or column of $A$ by a scalar, then $\det(B) = \det(A)$.
		</template>
		<template #c>
			If $B$ is a matrix obtained from $A$ by adding a multiple of some row to a different row
			(or a multiple of some column to a different column), then $\det(B) = \det(A)$.
		</template>
		<template #d>
			The determinant of an upper triangular $n \times n$ matrix is the product of its diagonal entries.
		</template>
		<template #e>
			If $Q$ is an invertible matrix, then $\det(Q^{-1}) = \det(Q)^{-1}$.
		</template>
	</MakeProblem>
</template>
