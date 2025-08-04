<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(10%)', '(5%)', '(5%)']">
		<template #problem>
			Let $A$ be a Hermitian matrix with eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_n$
			and orthonormal eigenvectors $u_1, \cdots\!, u_n$.
			For any nonzero vector $x$ in $\mathbb{R}^n$, the Rayleigh quotient $\rho(x)$ is defined by
			$$\rho(x) = \frac{\langle Ax, x \rangle}{\langle x, x \rangle} = \frac{x^H Ax}{x^H x}$$
		</template>
		<template #a>
			If $x = c_1u_1 + \cdots + c_nu_n$, show that
			$$\rho(x) = \frac{|c_1|^2 \lambda_1 + |c_2|^2 \lambda_2 + \cdots + |c_n|^2 \lambda_n}{\|c\|^2}$$
		</template>
		<template #b>
			Show that $\lambda_n \leq \rho(x) \leq \lambda_1$.
		</template>
		<template #c>
			Show that $\max\limits_{x \neq 0} \rho(x) = \lambda_1$ and $\min\limits_{x \neq 0} \rho(x) = \lambda_n$.
		</template>
	</MakeProblem>
</template>
