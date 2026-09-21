<template>
	<MakeProblem scoreText="(10%)">
		<template #problem>
			Let $A$ be an $n\times n$ positive semi‑definite matrix with eigenvalues $\lambda_1,\cdots\!,\lambda_n$ and
			corresponding eigenvectors $v_1,\cdots\!,v_n$. Suppose that $\lambda_1 \gt \lambda_2 \gt \cdots \gt \lambda_n$ and that
			the eigenvectors have unit 2‑norms. Let $c$ be a strictly positive real number. Then, the minimum value
			of the function $f(X) = \text{trace}(AX)$ over all $n\times n$ Hermitian matrices $X$ satisfying
			$\lVert X \rVert_* \leq c$ is attained at $X =$ ________. Here, $\lVert X \rVert_*$ denotes the nuclear norm of
			the matrix $X$, i.e., the sum of the singular values of $X$. Express your answer in terms of
			$\lambda_i,~ v_i,~ v_i^*,~ c$, and numbers, where $v_i^*$ denotes the conjugate transpose of $v_i$.
		</template>
	</MakeProblem>
</template>
