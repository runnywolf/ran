<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Following the previous question. The subspace $V = U^\perp$ is $U\!$’s orthogonal complement in $\mathbb{R}^4$.
			Given a vector $w = \!\begin{bmatrix} 10 \\ 0 \\ 8 \\ 2 \end{bmatrix}\!$, find $w = v + u$,
			where $v = \!\begin{bmatrix} a \\ b \\ c \\ d \end{bmatrix}\! \in V$,
			$u = \!\begin{bmatrix} e \\ f \\ g \\ h \end{bmatrix}\! \in U$.
			What is $( \text{Round}\{ c^2 + g^2 \} ) \% 5$?
			<br>($\%$ is the modulo operation. $\text{Round}\{ z \}$ rounds $z$ to the nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
