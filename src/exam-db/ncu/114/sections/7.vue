<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			$A$ is an $n \times n$ symmetric matrix. Which of the following statements are true?
		</template>
		<template #a>
			If $A^{-1}$ exists, $A^{-1}$ must be symmetric.
		</template>
		<template #b>
			$A$ must have a complete set of ($\!n\!$) orthonormal eigenvectors.
		</template>
		<template #c>
			If $A^2 = A$, its eigenvalues must be $0$ and $1$.
		</template>
		<template #d>
			If the sum of each individual column of $A$ is $1$, then one of its eigenvalues is $1$.
		</template>
		<template #e>
			If $B$ is also an $n \times n$ symmetric matrix. $AB$ must be symmetric.
		</template>
	</MakeProblem>
</template>
