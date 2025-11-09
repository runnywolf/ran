<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Diagonalize matrix $A = @bm{ 1, 1, 5; 1, 5, 1; 5, 1, 1 }$;
			that is to find matrices $P$ and $D$ such that $A = P D P^T$.
			Which values are <span class="ran-bold">not</span> in $P$ or $D$ matrices?
		</template>
		<template #A>$@cf{1;\sqrt{3}}$</template>
		<template #B>$@cf{-1;\sqrt{8}}$</template>
		<template #C>$@cf{2;\sqrt{8}}$</template>
		<template #D>$@cf{-1;2}$</template>
		<template #E>$@cf{1;3}$</template>
	</MakeProblem>
</template>
