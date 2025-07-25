<template>
	<MakeProblem scoreText="(10%)" listEndLabel="E">
		<template #problem>
			Let $T$ be a self-adjoint operator on a finite-dimensional inner product space $V$ with distinct
			eigenvalues $\lambda_1, \lambda_2, \cdots\!, \lambda_k$. Let $E_i$ be the eigenspace of $T$
			corresponding to $\lambda_i$, and let $T_i$ be the orthogonal projection of $V$ on $E_i$, $1 \leq i \leq k$.
		</template>
		<template #A>
			$\! \sum_{i=1}^{k} \lambda_i T_i = T$
		</template>
		<template #B>
			$\! V = E_1 \oplus E_2 \oplus \cdots \oplus E_k$
		</template>
		<template #C>
			Given any polynomial $g$, $g(T) = g(\lambda_1) T_1 + g(\lambda_2) T_2 + \cdots + g(\lambda_k) T_k$.
		</template>
		<template #D>
			$\! \lambda_1, \lambda_2, \cdots\!, \lambda_k$ are all real numbers.
		</template>
		<template #E>
			If $T(x) = Ax$, where $x \in \mathbb{C}^n$, then $A$ is diagonalizable.
		</template>
	</MakeProblem>
</template>
