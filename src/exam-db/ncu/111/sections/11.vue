<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following statements are true?
		</template>
		<template #A>
			If $A^2$ is a diagonal matrix, $A$ must be a diagonal matrix.
		</template>
		<template #B>
			If $A_{n \times n}$ has a complete set of orthonormal eigenvectors
			(i.e., $n$ eigenvectors that are orthonormal), it must be a Hermitian matrix.
		</template>
		<template #C>
			If $A A^H = A^H A$, where $A^H$ is the Hermitian transpose of $A$, then $A$ can always be diagonalized.
		</template>
		<template #D>
			If the rank of an $n$ by $n$ matrix, $A$, is $r \lt n$, then its $n-r$ eigenvalues are zero.
		</template>
		<template #E>
			If $k$ is an eigenvalue of $A$, we may find more than one eigenvector corresponding to $k$.
		</template>
	</MakeProblem>
</template>
