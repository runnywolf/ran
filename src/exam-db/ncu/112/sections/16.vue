<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			The following matrix $A$ is the transformation matrix of a linear operator $\text{A}$.
			Find the linear transformation matrix $B$ that represents the linear operator $\text{A}$
			relative to the basis $[1, 1, 0]^T$, $[0, 1, 1]^T$ and $[1, 2, 2]^T$.
			$$ A = @bm{ 1, 3, 1; 2, 5, -4; 1, -2, 2 } $$
			$b$ is obtained by summing up all the elements in $B$, taking the absolute value
			and then rounding to the nearest integer.
			What is the value of $\text{mod}(b, 5)$, where $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
