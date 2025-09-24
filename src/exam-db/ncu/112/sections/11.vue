<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following statements about symmetric matrices are true?
		</template>
		<template #A>
			The symmetric matrix $A$ has a complete set of orthonormal eigenvectors even though it has repeated eigenvalues.
		</template>
		<template #B>
			For the symmetric matrices $A$ and $B$, $A + B$ and $AB$ are both symmetric.
		</template>
		<template #C>
			If the rank of a symmetric matrix, $A_{n \times n}$, is $r \lt n$, then its $n-r$ eigenvalues are zero.
		</template>
		<template #D>
			The eigenvalues of symmetric matrices are real values. In other words, they cannot be complex values.
		</template>
		<template #E>
			None of the above is true.
		</template>
	</MakeProblem>
</template>
