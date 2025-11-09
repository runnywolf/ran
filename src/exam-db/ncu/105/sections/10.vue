<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			What options are true when using generating function to solve the recurrence relation:
			$a_n = 2a_{n-1} - a_{n-2} + 2^{n-2},~ a_0 = 1,~ a_1 = 2$. ($g(z)$ is the generating function)
		</template>
		<template #a>$g(z) = 1/(1-2z)$</template>
		<template #b>$g(z) = (1-2z+z^2)/(1-2z)$</template>
		<template #c>
			$g(z) = @cf{1;\sqrt{5}} @(){ @cf{1; 1-((1+\sqrt{5})/2)z} - @cf{1; 1+((1-\sqrt{5})/2)z} }$
		</template>
		<template #d>$a_n = 2^n$</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
