<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $A$ be an $n \times n$ Hermitian matrix over $\mathbb{C}$. Which of the following statements are true?
		</template>
		<template #a>All eigenvalues of $A$ are real.</template>
		<template #b>
			If $x$ and $y$ are eigenvectors corresponding to distinct eigenvalues, then $x$ and $y$ are orthogonal.
		</template>
		<template #c>The sum of two Hermitian matrices is Hermitian.</template>
		<template #d>Every Hermitian matrix is diagonalizable by a unitary matrix.</template>
		<template #e>The product of two Hermitian matrices is always Hermitian.</template>
	</MakeProblem>
</template>
