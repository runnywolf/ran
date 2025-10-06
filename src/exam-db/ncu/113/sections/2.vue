<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Suppose that in $P_3$ we want to change from the ordered basis $[1, x, x^2]$
			to the ordered basis $[1,~ 2x,~ 4x^2 - 2]$.
			Let the transition matrix from the first basis to the second basis be $S$,
			and the number of zeros in $S$ be $d$. What is $d \% 5$?
			<br>($\%$ is the modulo operation.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
