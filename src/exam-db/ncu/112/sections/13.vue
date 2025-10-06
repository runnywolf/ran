<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following about eigenvalues/eigenvectors are true?
		</template>
		<template #A>
			If an 8x8 square matrix has 8 positive pivots after applying Gaussian elimination,
			then its eigenvalues cannot be negative.
		</template>
		<template #B>
			For the two square matrices $A$ and $B$, both of which are diagonalizable,
			if $AB = BA$, then $A$ and $B$ have the same eigenvalues.
		</template>
		<template #C>
			If two square matrices $A$ and $B$ are similar, i.e., $A = M B M^{-1}$,
			then $A$ and $B$ have the same eigenvalues.
		</template>
		<template #D>
			For a square matrix $A$, the matrices $A A^T$ and $A^T A$ have the same eigenvalues.
		</template>
		<template #E>
			None of the above is true.
		</template>
	</MakeProblem>
</template>
