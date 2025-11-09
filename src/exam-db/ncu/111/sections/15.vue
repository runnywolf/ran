<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			The determinant of the following matrix $A$ is $m$.
			$$ A = @bm{ 1, -1, 8, 4, 2; 2, 6, 0, -4, 3; 2, 0, 2, 6, 2; 0, 2, 8, 0, 0; 0, 1, 1, 2, 2 } $$
			The determinant of the following matrix $B$ is $n$.
			$$ B = @bm{ 1.25, 1, 1, 1; 1, 1.2, 1, 1; 1, 1, 1.1, 1; 1, 1, 1, 1.5 } $$
			$k = @f{1;10000}|@f{m;n}|$. Which of the following is the range of $k$?
		</template>
		<template #A>$0 \le k \lt 1$</template>
		<template #B>$1 \le k \lt 2$</template>
		<template #C>$2 \le k \lt 3$</template>
		<template #D>$4 \le k \lt 5$</template>
		<template #E>$5 \le k$</template>
	</MakeProblem>
</template>
