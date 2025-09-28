<template>
	<MakeProblem scoreText="">
		<template #problem>
			Solving the recurrence relation $a_n = a_{n-1} + 20a_{n-2}, a_0 = -1, a_1 = -1, \forall n \geq 2$, using generating function G(z), which following parts are true?
			A. $G(Z) = (1+z)/(1-z-20z^2)$
			B. $G(Z) = (-1-z)/(1-z-20z^2)$
			C. $G(Z) = \left(\frac{-6}{1-5z}\right) + \left(\frac{5}{1+4z}\right)$
			D. $G(Z) = \left(\frac{-2/3}{1-5z}\right) + \left(\frac{-1/3}{1+4z}\right)$
			E. $a_n = \left(\frac{-2}{3}, 5^n\right) + \left(\frac{-1}{3}, (-4)^n\right)$
		</template>
	</MakeProblem>
</template>
