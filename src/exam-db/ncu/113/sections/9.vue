<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			$A = \begin{bmatrix} 4 & 1 & -1 \\ 2 & 5 & -2 \\ 1 & 1 & 2 \end{bmatrix}$.
			$P$ is used to diagonalize $A$ by $P^{-1} A P = D$, where
			$D = \begin{bmatrix} a & 0 & 0 \\ 0 & b & 0 \\ 0 & 0 & c \end{bmatrix}$, $a \le b \le c$, and
			$P = \begin{bmatrix} d & e & 1 \\ -1 & f & g \\ h & 1 & j \end{bmatrix}$. What is the value $k$,
			$k = ( \text{Round}\{ | a+b+c+d+e+f+g+h+j | \} ) \% 5$?
			<br>($|\cdot|$ is the absolute value. $\%$ is the modulo operation.
			$\text{Round}\{ z \}$ rounds $z$ to the nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
