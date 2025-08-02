<template>
	<MakeProblem listEndLabel="e" :listItemScoreTexts="['(2%)', '(2%)', '(2%)', '(2%)', '(2%)']">
		<template #problem>
			True or False
		</template>
		<template #a>
			If a $3 \times 2$ matrix $Q$ has orthonormal columns, then $\|Qx\|$ always equals $\|x\|$.
		</template>
		<template #b>
			Let $P = A(A^T A)^{-1}A^T$, where $A$ is an $m \times n$ matrix of rank $n$.
			Then $P^k = P$ for $k = 1, 2, \cdots$.
		</template>
		<template #c>
			If $\{u_1, u_2, \cdots\!, u_k\}$ is an orthonormal set of vectors in $\mathbb{R}^n$ and
			$U = (u_1, u_2, \cdots\!, u_k)$, then $UU^T = I_n$ (the $n \times n$ identity matrix).
		</template>
		<template #d>
			If $A$ is symmetric and $\det(A) > 0$, then $A$ is positive definite.
		</template>
		<template #e>
			If $A$ is symmetric positive definite, then the diagonal elements of $A$ must all be positive.
		</template>
	</MakeProblem>
</template>
