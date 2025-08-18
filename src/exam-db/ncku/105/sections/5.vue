<template>
	<MakeProblem scoreText="(15%)" listEndLabel="e">
		<template #problem>
			For each statement that follows, answer true if the statement is always true and false otherwise.
			In the case of a true statement, explain or prove your answer.
			In the case of a false statement, give an example to show that the statement is not always true.
		</template>
		<template #a>
			If $A$ is an $n \times n$ matrix, then $A$ and $A^T$ have the same eigenvectors.
		</template>
		<template #b>
			If $A$ has eigenvalues of multiplicity greater than 1, then $A$ must be defective.
		</template>
		<template #c>
			If $A$ is a $4 \times 4$ matrix of rank 3 and $\lambda = 0$ is an eigenvalue of multiplicity 3, then $A$ is diagonalizable.
		</template>
		<template #d>
			The rank of an $n \times n$ matrix $A$ is equal to the number of nonzero eigenvalues of $A$, where eigenvalues are counted according to multiplicity.
		</template>
		<template #e>
			If $A$ is symmetric positive definite, then $A$ is nonsingular and $A^{-1}$ is also symmetric positive definite.
		</template>
	</MakeProblem>
</template>
