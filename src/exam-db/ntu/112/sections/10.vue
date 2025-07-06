<template>
	<MakeProblem scoreText="(5%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']" useUlToListOptions>
		<template #problem>
			Let <vl exp="A \in M_{n \times n}" />, which of the following statements are true?
		</template>
		<template #A>
			The nullspace of <vl exp="A" /> is the same as the nullspace of <vl exp="A^T A" />.
		</template>
		<template #B>
			If <vl exp="A" /> is orthogonal, <vl exp="A + \frac{1}{2} I" /> is invertible.
		</template>
		<template #C>
			If <vl exp="A" /> has fewer than n distinct eigenvalues,
			then <vl exp="A" /> is not diagonalizable.
		</template>
		<template #D>
			If <vl exp="A = A^T" />, then its eigenvalues are real and eigenvectors are orthogonal.
		</template>
		<template #E>
			If <vl exp="A" /> is positive definite, we can always find a nonsingular
			<vl exp="U" /> such that <vl exp="A = U^2" />.
		</template>
	</MakeProblem>
</template>
