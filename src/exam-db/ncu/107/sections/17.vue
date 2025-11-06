<template>
	<MakeProblem listEndLabel="E">
		<template #problem>Which of the following transformations are not linear?</template>
		<template #A>$S:$ the map in $\mathbb{R}^3$ which rotates points about the $x_1\!$-axis by an angle $\pi/2$.</template>
		<template #B>$T @bm{ x_1; x_2; x_3 } = @bm{ x_1 + 1; x_2 - 1; x_3 }$</template>
		<template #C>$T @bm{ x_1; x_2 } = @bm{ x_1 - x_2; x_1 + x_2 }$</template>
		<template #D>$T(ax^2 + bx + c) = (a + b)x + (b + c)$</template>
		<template #E>$T[x] = e^x$</template>
	</MakeProblem>
</template>
