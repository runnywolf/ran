<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $A = \!\begin{bmatrix} 2 & 4 & 2 \\ 1 & 5 & 2 \\ 4 & -1 & 9 \end{bmatrix}\!$,
			and the $LU$ decomposition of $A$ be
			$
			\!\begin{bmatrix} 1 & 0 & 0 \\ a & 1 & 0 \\ b & c & 1 \end{bmatrix}\!
			\!\begin{bmatrix} d & e & f \\ 0 & g & h \\ 0 & 0 & i \end{bmatrix}\!
			$.
			What is $\lfloor a + b + c + d + e + f + g + h + i \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
