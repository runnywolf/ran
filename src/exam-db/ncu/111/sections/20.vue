<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Construct a spectral decomposition of matrix $@bm{ 3, 4; 4, 9 }$.
			Which values are <span class="ran-bold">not</span> in the solution matrices.
		</template>
		<template #A>$@cf{1;5} ~,~ @cf{-1;5}$</template>
		<template #B>$@cf{2;5} ~,~ @cf{-2;5}$</template>
		<template #C>$@cf{4;5} ~,~ @cf{-4;5}$</template>
		<template #D>$@cf{1;5} ~,~ @cf{4;5}$</template>
		<template #E>$@cf{-1;5} ~,~ @cf{-4;5}$</template>
	</MakeProblem>
</template>
