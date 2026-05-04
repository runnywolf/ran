<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			When using the generating function $g(x)$ to solve the recurrence relation
			$\forall n \ge 2 ,~ a_n = -a_{n-1} + 6a_{n-2} ,~ a_0 = 0 ,~ a_1 = 5$, what of the followings are true?
		</template>
		<template #a>$G(x)(1+x-6x^2) = 5x$</template>
		<template #b>$G(x)(1+x-6x^2) = 2 + 7x$</template>
		<template #c>$G(x) = \frac{1}{1-2x} - \frac{1}{1+3x}$</template>
		<template #d>$G(x) = \frac{2}{1-2x} - \frac{3}{1+3x}$</template>
		<template #e>$a_n = 2^n - (-3)^n$</template>
	</MakeProblem>
</template>
