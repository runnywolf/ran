<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			What parts are true when using generating function to solve the recurrence relation:
			$\forall n \geq 2 ,~ a_n = -6a_{n-1} + 7a_{n-2} ,~ a_0 = -5 ,~ a_1 = 3.$ ($g(z)$ is the generating function)
		</template>
		<template #A>$g(z) = -(33z + 5)/(1 + 6z - 7z^2)$</template>
		<template #B>$g(z) = -1/(1 + 7z) - 4/(1 - z)$</template>
		<template #C>$a_n = -4 - (-7)^n$</template>
		<template #D>$a_n = 8n - 5$</template>
		<template #E>None of the above.</template>
	</MakeProblem>
</template>
