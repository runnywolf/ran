<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			What equations are true when using generating function to solve the recurrence series:
			$a_n = 6a_{n-1} - 9a_{n-2},~ a_0 = 1,~ a_1 = 6$, which of the followings are true?
		</template>
		<template #A>$g(z) = 1/(1 - 3z)^2$</template>
		<template #B>$g(z) = 1/(1 - 3z^2)$</template>
		<template #C>$g(z) = (1 + 6z)/(1 - 3z)^2$</template>
		<template #D>$a_n = (7n + 1)3^n$</template>
		<template #E>$a_n = (n + 1)3^n$</template>
	</MakeProblem>
</template>
