<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Given that $A = @bm{ 0, 0, -2; 1, 2, 1; 1, 0, 3 },~ B = A^{12}$.
			$b$ is obtained by summing up all the elements in $B$.
			What is $\text{mod}(|b|,5)$, where $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
