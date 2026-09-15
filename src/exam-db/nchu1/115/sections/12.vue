<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let the following sets be subsets of vector spaces over $\mathbb{R}$.
			Which of the following sets are linearly independent?
		</template>
		<template #A>$\{ (1,2,0,1), (3,6,1,3), (0,0,1,0) \} \subset \mathbb{R}^4$</template>
		<template #B>$\{ 3,~ x-2,~ x^2-2x+1 \} \subset P_2$</template>
		<template #C>$\left\{ @pm{1,3;2,7}, @pm{4,2;-1,2}, @pm{-1,7;7,19} \right\} \subset M_{2\times2}$</template>
		<template #D>$\{ \sin x,~ \cos x,~ \sin 2x \} \subset C[0,2\pi]$</template>
		<template #E>$\{ x,~ |x|,~ x|x| \} \subset C(\mathbb{R})$</template>
	</MakeProblem>
</template>
