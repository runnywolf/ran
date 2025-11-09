<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Find a singular value decomposition $A = U \Sigma V^T$ with $U$ and $V$ being both orthogonal matrices,
			where $A = @bm{ 4, 11, 14; 8, 7, -2 }$. Which values are <span class="ran-bold">not</span> in $U$ or $V$ matrices?
		</template>
		<template #A>$@cf{1;\sqrt{3}}$</template>
		<template #B>$@cf{1;\sqrt{10}}$</template>
		<template #C>$@cf{2;\sqrt{10}}$</template>
		<template #D>$@cf{-2;3}$</template>
		<template #E>$@cf{1;3}$</template>
	</MakeProblem>
</template>
