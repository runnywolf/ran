<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Given a 4 by 4 matrix, $A$, as below, find its inverse matrix, $A^{-1}$.
			$$ A = @bm{ 1, 2, 1, -1; 2, 5, 1, -1; 1, 3, 2, 1; 2, 4, 1, -2 } $$
			The sum of all the elements of $A^{-1}$ is $b$. Rounding $|b|$ to the nearest integer, $c$.
			What is the value of $\text{mod}(c, 5)$, where $\text{mod}(\cdot)$ is the modulo operation.
			(For example, $\text{mod}(5, 2) = 1$.)
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
