<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Give the necessary conditions for matrix $A$ can be factorized. <span class="ran-app-font">(複選)</span><br>
			11. $A = PDP^{-1}$<br>
			12. $A = QR$<br>
			13. $A = PDP^T$<br>
			14. $A = \lambda_1 u_1 {u_1}^T + \lambda_2 u_2 {u_2}^T + \cdots + \lambda_n u_n {u_n}^T$<br>
			15. $A = R^T R$ (Cholesky factorization)<br>
		</template>
		<template #A>square but non‑symmetric</template>
		<template #B>square and symmetric</template>
		<template #C>linearly‑independent columns</template>
		<template #D>linearly‑independent eigenvectors</template>
		<template #E>positive definite</template>
	</MakeProblem>
</template>
