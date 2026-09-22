<template>
	<MakeProblem listEndLabel="D">
		<template #problem>
			Consider two square matrices $A$ and $B$, where $A\in\mathbb{R}^{n\times n}$,
			$B\in\mathbb{R}^{n\times n}$. Let $\det(A)$ and $\det(B)$ be the determinants of these matrices,
			$c$ is a real number, and $\text{tr}(A)$ and $\text{tr}(B)$ are traces for matrices
			$A$ and $B$ respectively. Which of the following statement is False?
		</template>
		<template #A>$\det((AB)^T)=\det(A)\det(B)$</template>
		<template #B>$\det(A^{-1})=\det(A)^{-1}$, if $A$ is invertible.</template>
		<template #C>$\det(cA)=|c|\det(A)$</template>
		<template #D>$\text{tr}(AB)=\text{tr}(BA)$</template>
	</MakeProblem>
</template>
