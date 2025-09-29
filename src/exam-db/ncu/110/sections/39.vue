<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Which vectors form the basis of $\text{null}(A)$?
			$$ A = @bm{ 1, 1, 3, 1, 6; 2, -1, 0, 1, -1; -3, 2, 1, -2, 1; 4, 1, 6, 1, 3 } $$
		</template>
		<template #A>$@bm{ -3; 2; 1; -1; 1 }$</template>
		<template #B>$@bm{ -1; -2; 1; 0; 0 }$</template>
		<template #C>$@bm{ 1; -3; 0; -4; 1 }$</template>
		<template #D>$@bm{ 2; -1; 0; 1; -1 }$</template>
		<template #E>None</template>
	</MakeProblem>
</template>
