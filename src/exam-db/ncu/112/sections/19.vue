<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Find the least squares solution of the system $Ax = b$, in which
			$$ A = @bm{ 1, 0, 1; 1, 1, 1; 0, 1, 1; 1, 1, 0 } ~~ \text{and} ~~ b = @bm{ 4; -1; 0; 1 } . $$
			$c$ is the rounding (or nearest) integer of the sum of the elements in $x$.
			What is the value of $\text{mod}(|c|,5)$, where $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
