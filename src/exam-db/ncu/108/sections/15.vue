<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			What is the inverse of the matrix $@bm{ -4, 0, 5; -3, 3, 5; -1, 2, 2 }$?
		</template>
		<template #A>$@bm{ 1, -2, -2; 0, 1, 1/3; 0, -8, -3 }$</template>
		<template #B>$@bm{ -4, 10, -15; 1, -3, 5; -3, 8, -12 }$</template>
		<template #C>$@bm{ -6, 16, -25; 1, -3, 5; -3, 8, -12 }$</template>
		<template #D>$@bm{ 1, -2, 0; 0, 1, 0; 0, 0, 1 }$</template>
		<template #E>$@bm{ 4, -6, -15; -1, 3, 5; 3, 8, -12 }$</template>
	</MakeProblem>
</template>
