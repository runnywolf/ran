<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Solving the recurrence relation $a_n = a_{n-1} + 20 a_{n-2} ,~ a_0 = -1 ,~ a_1 = -2 ,~ \forall n \ge 2$,
			using generating function $G(z)$, which following parts are true?
		</template>
		<template #A>$G(z) = (1+z)/(1-z-20z^2)$</template>
		<template #B>$G(z) = (-1-z)/(1-z-20z^2)$</template>
		<template #C>$G(z) = @f{-6; 1-5z} + @f{5; 1+4z}$</template>
		<template #D>$G(z) = @f{-2/3; 1-5z} + @f{-1/3; 1+4z}$</template>
		<template #E>$a_n = @f{-2; 3} \cdot 5^n + @f{-1; 3} (-4)^n$</template>
	</MakeProblem>
</template>
<!-- [fix problem error] "a_1 = -1" -> "a_1 = -2" (原題本為送分, 已修改錯誤) -->
