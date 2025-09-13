<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $A$ be a $4 \times 4$ matrix with reduced row echelon form given by
			$U = \!\begin{bmatrix} 1 & 0 & -1 & 1 \\ 0 & 1 & 3 & 2 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}\!$.
			Let the first two columns of $A$ be $\!\begin{bmatrix} 3 \\ 2 \\ -1 \\ 2 \end{bmatrix}\!$
			and $\!\begin{bmatrix} 1 \\ 1 \\ -2 \\ 3 \end{bmatrix}\!$, and denote the third column of $A$ as
			<vl exp="\!\begin{bmatrix} a \\ b \\ c \\ d \end{bmatrix}\!" style="line-height: 110px" />.
			What is $\lfloor a + b + c + d \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
