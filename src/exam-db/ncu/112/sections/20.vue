<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Find an orthogonal matrix $P$ that diagonalizes $A$ as shown below. That is, $P^T A P = D$,
			where $D$ is a diagonal matrix.
			$$ A = @bm{ 1, -1, 2; -1, 1, 2; 2, 2, 2 } $$
			The product of the three elements in the first row of $P$ is $b$.
			The product of the three elements in the main diagonal of $D$ is $d$.
			$c$ is the rounding (or nearest) integer of $|b \times d \times 6|$.
			What is the value of $\text{mod}(c,5)$, where $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
