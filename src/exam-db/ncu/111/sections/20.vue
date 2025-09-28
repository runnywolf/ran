<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Construct a spectral decomposition of matrix $@bm{ 3, 4; 4, 9 }$.
			Which values are <span class="ran-bold">not</span> in the solution matrices.
		</template>
		<template #A>$\cfrac{1}{5} ~,~ \cfrac{-1}{5}$</template>
		<template #B>$\cfrac{2}{5} ~,~ \cfrac{-2}{5}$</template>
		<template #C>$\cfrac{4}{5} ~,~ \cfrac{-4}{5}$</template>
		<template #D>$\cfrac{1}{5} ~,~ \cfrac{4}{5}$</template>
		<template #E>$\cfrac{-1}{5} ~,~ \cfrac{-4}{5}$</template>
	</MakeProblem>
</template>
