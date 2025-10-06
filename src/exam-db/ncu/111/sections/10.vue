<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			There is a series of number $a_n$,
			$\forall n \gt 1,~ (a_{n-1} - a_{n-2}) = 2(a_n - a_{n-1}),~ a_0 = 5,~ a_1 = 9$.
			Using generating function $f(z)$ to solve $a_n$, what of the followings are true?
		</template>
		<template #A>$f(z) = @cf{10+3z; 2-3z+z^2}$</template>
		<template #B>$f(z) = @cf{1; 1-2z} + @cf{z; (1-z)^2 (1-2z)}$</template>
		<template #C>$f(z) = @cf{-8; 1 - (1/2) z} - @cf{13; 1-z}$</template>
		<template #D>$a_n = 13 - 8 ( @cf{1; 2} )^n$</template>
		<template #E>$a_n = 16 \cdot 2^n - 13$</template>
	</MakeProblem>
</template>
