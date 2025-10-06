<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			First, consider the linear system
			$$
			\left\{
			\begin{alignat*}{4}
			k&x~+~& &y~+~& &z=~& 1 \\
			&x~+~& k&y~+~& &z=~& 1 \\
			&x~+~& &y~+~& k&z=~& 1
			\end{alignat*}
			\right.
			$$
			If $k = a$, the system has more than one solution. If $k = b$, the system has no solution.
			The closest integer of $|a-b|$ is $c$. $m = \text{mod}(c, 5)$,
			where $\text{mod}(\cdot)$ is the modulo operation.<br>
			Next, consider the linear system
			$$
			\left\{
			\begin{alignat*}{4}
			&x~+~& &y~+~& &z=~& 4 \\
			2&x~+~& &y~+~& 2&z=~& 7 \\
			&x& &\,~~-& 2&z=~& 3 \\
			&& &y~+~& 2&z=~& 4
			\end{alignat*}
			\right.
			$$
			Its least squares solution is $\{ \~{x}, \~{y}, \~{z} \}$. The closest integer of $50 \~{y}$ is $n$.<br>
			What is the value of $\text{mod}(m+n,~ 5)$?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
