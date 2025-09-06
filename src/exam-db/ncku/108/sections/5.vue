<template>
	<MakeProblem scoreText="(15%)">
		<template #problem>
			Solve the following recurrence equations for $A(n)$, and $B(n)$.
			$$
			\begin{cases}
			A(n) = 3A(n-1) + 2B(n-1) \\
			B(n) = A(n-1) + B(n-1) \\
			n \geq 1 ,~ A(0) = \sqrt{3} ,~ B(0) = 0
			\end{cases}
			$$
		</template>
	</MakeProblem>
</template>
