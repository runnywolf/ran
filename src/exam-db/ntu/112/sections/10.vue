<template>
	<vk>
		<MakeProblem scoreText="(5%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']" useUlToListOptions>
			<template #problem>
				Let $A \in M_{n \times n}$, which of the following statements are true?
			</template>
			<template #A>
				The nullspace of $A$ is the same as the nullspace of $A^T A$.
			</template>
			<template #B>
				If $A$ is orthogonal, $A + \frac{1}{2} I$ is invertible.
			</template>
			<template #C>
				If $A$ has fewer than n distinct eigenvalues, then $A$ is not diagonalizable.
			</template>
			<template #D>
				If $A = A^T$, then its eigenvalues are real and eigenvectors are orthogonal.
			</template>
			<template #E>
				If $A$ is positive definite, we can always find a nonsingular $U$ such that $A = U^2$.
			</template>
		</MakeProblem>
	</vk>
</template>
