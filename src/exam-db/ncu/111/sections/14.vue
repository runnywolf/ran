<template>
	<MakeProblem scoreText="">
		<template #problem>
			First, consider the linear system
			$$\begin{cases}
			kx + y + z = 1 \\
			x + ky + z = 1 \\
			x + y + kz = 1
			\end{cases}$$
			If $k = a$, the system has more than one solution. If $k = b$, the system has no solution. The closest integer of $|a-b|$ is $c$. $M=\text{mod}(c,5)$, where $\text{mod}(\cdot)$ is the modulo operation.
			Next, consider the linear system
			$$\begin{cases}
			x + y + z = 4 \\
			2x + y + 2z = 7 \\
			x - 2z = 3 \\
			y + 2z = 4
			\end{cases}$$
			Its least squares solution is $\{x, y, z\}$. The closest integer of $(y \times 50)$ is $N$.
			What is the value of $\text{mod}(M+N,5)$?
			(A) 0 (B) 1 (C) 2 (D) 3 (E) 4
		</template>
	</MakeProblem>
</template>
