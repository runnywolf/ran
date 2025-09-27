<template>
	<MakeProblem scoreText="">
		<template #problem>
			$A^5 = \begin{bmatrix} 32 & 100000 \\ 0 & 3125 \end{bmatrix}$. The determinant of $A$ is $M$. The closest integer of summing up the four entries in $A$ is $N = \text{round}(A_{11} + A_{12} + A_{21} + A_{22})$. What is the value of $\text{mod}(M + N \times 13, 5)$, where $\text{mod}(\cdot)$ is the modulo operation.
			(A) 0 (B) 1 (C) 2 (D) 3 (E) 4
		</template>
	</MakeProblem>
</template>
