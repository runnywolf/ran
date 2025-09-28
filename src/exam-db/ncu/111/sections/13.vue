<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			$A^5 = @bm{ 32, 100000; 0, 3125 }$. The determinant of $A$ is $m$.
			The closest integer of summing up the four entries in $A$ is
			$n = \text{round}(A_{11} + A_{12} + A_{21} + A_{22})$.
			What is the value of $\text{mod}(m + 13n,~ 5)$, where $\text{mod}(\cdot)$ is the modulo operation.
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
