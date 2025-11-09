<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Given the following system of linear equations:
			$$
			\left\{
			\begin{alignat*}{5}
			&x_1 ~+~& 2&x_2 ~-~& &x_3 ~+~& &x_4& &= 0 \\
			-&x_1 ~-~& 2&x_2 ~+~& 3&x_3 ~+~& 5&x_4& &= 0 \\
			-&x_1 ~-~& 2&x_2 ~-~& &x_3 ~-~& 7&x_4& &= 0
			\end{alignat*}
			\right.
			$$
			Which vectors form a basis for the solutions to the system?
		</template>
		<template #A>$@bm{ -2; 1; 0; 0 }$</template>
		<template #B>$@bm{ -1; -2; -1; -7 }$</template>
		<template #C>$@bm{ 1; 2; -1; 1 }$</template>
		<template #D>$@bm{ -1; -2; 3; 5 }$</template>
		<template #E>$@bm{ -4; 0; -3; 1 }$</template>
	</MakeProblem>
</template>
