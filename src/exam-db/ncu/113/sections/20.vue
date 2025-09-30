<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Solving recurrence equation $\forall n \ge 2 ,~ 2a_n = 7a_{n-1} - 6a_{n-2} ,~ a_0 = 3/2 ,~ a_1 = 11/4$.
			Which of the following statement are true?
		</template>
		<template #a>The characteristic polynomial for this equation is $6x^2 - 7x + 2 = 0$.</template>
		<template #b>Using generating function, we have $2G(z) - 7zG(z) + 6z^2 G(z) = 0$.</template>
		<template #c>Using generating function, we have $G(z) = @cf{3 - 5z; 2 - 7z + 6z^2}$.</template>
		<template #d>$a_n = (1/2)(3/2)^n + 2^n$</template>
		<template #e>$a_n = (1/2)^{n+1} + 2^n$</template>
	</MakeProblem>
</template>
