<template>
	<MakeProblem scoreText="(10%)" listEndLabel="E" useSpanList>
		<template #problem>
			Given $A = @bm{ @f{3;5}, @f{2;5}; @f{2;5}, @f{3;5} }$ and $x = @bm{2; 0}$.
			If $\lim\limits_{n \to \infty} A^n x = @bm{a; b}$, what is $2a + b$?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
