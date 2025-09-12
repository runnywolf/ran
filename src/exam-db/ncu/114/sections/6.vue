<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			$A$ and $B$ are both $n \times n$ square matrices. Which of the following statements are true?
		</template>
		<template #a>
			$\lambda_A$ is the eigenvalue of $A$ and $\lambda_B$ is the eigenvalue of $B$.
			$\lambda_A \lambda_B$ is the eigenvalue of $AB$.
		</template>
		<template #b>
			$AB$ and $BA$ have the same eigenvalues.
		</template>
		<template #c>
			$AB$ and $BA$ have the same eigenvectors.
		</template>
		<template #d>
			If $B = M^{-1} A M$, then $A$ and $B$ have the same eigenvalues.
		</template>
		<template #e>
			If $A A^H = A^H A$ ($A^H$ is $A\!$’s Hermitian Transpose), then $A$ and $A^H$ have the same eigenvalues.
		</template>
	</MakeProblem>
</template>
