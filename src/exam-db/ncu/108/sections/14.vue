<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			If $ A = @bm{ 1, 0, 0, 0, 0; 2, 1, 0, 0, 0; 3, 2, 1, 0, 0; 1, 2, 3, 1, 0; 1, 1, 1, 1, 1 }
			@bm{ 1, 0, 1, 0, 1; 0, 1, 2, 1, 1; 0, 0, 1, 1, 0; 0, 0, 0, 2, 1; 0, 0, 0, 0, 1 } $,
			what is the solution of $A @bm{ x_1; x_2; x_3; x_4; x_5 } = @bm{ 1.5; 7.5; 15.5; 14.0; 4.0 }$?
		</template>
		<template #A>$@bm{ 0.5; 0.5; 1.5; 2.5; -0.5 }$</template>
		<template #B>$@bm{ -0.5; -1.5; 0.5; 1.5; 2.5 }$</template>
		<template #C>$@bm{ 1.5; -0.5; -1.5; 0.5; 1.5 }$</template>
		<template #D>$@bm{ 0.5; 1.5; 2.5; -0.5; -1.5 }$</template>
		<template #E>$@bm{ 1.5; 2.5; -0.5; -1.5; 0.5 }$</template>
	</MakeProblem>
</template>
