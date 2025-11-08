<template>
	<MakeProblem listEndLabel="e">
		<template #problem>If $A$ can be $QR$ factorized (i.e., $A = QR$), then</template>
		<template #a>$A$ has linearly independent eigenvectors.</template>
		<template #b>The columns of $Q$ are orthonormal basis for $\text{Col}(A)$.</template>
		<template #c>$Q^T Q = I$ (identity matrix).</template>
		<template #d>
			$$ \begin{gather*}
			A = QR \text{ and } Q^T Q = I ~~\Rightarrow~~ Q^T A = Q^T Q R ~~\Rightarrow~~ Q^T A = R \\
			\Rightarrow~~ QQ^T A = QR = A ~~\Rightarrow~~ QQ^T = I .
			\end{gather*} $$
		</template>
		<template #e>
			$R$ is an upper triangular invertible matrix with positive entries on its upper triangle.
		</template>
	</MakeProblem>
</template>
