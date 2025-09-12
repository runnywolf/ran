<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			To solve the recurrence relation $a_n = 4a_{n-1} - 4a_{n-2},~ a_0 = 0,~ a_1 = 1/2$,
			what of the followings are true? (generating function $f(z)$ for this recurrence relation)
		</template>
		<template #a>
			$G(z)(1 - 4z + 4z^2) = \frac{1}{1+z} - 1 + \frac{3}{2} z$
		</template>
		<template #b>
			$G(z)(1 - 4z + 4z^2) = \frac{1}{1+z} - 1 + z$
		</template>
		<template #c>
			$G(z) = -\frac{1}{9} \frac{1}{1+z} + \frac{7}{9} \frac{z}{(1-2z)^2} + \frac{1}{9} \frac{1}{(1-2z)^2}$
		</template>
		<template #d>
			$G(z) = \frac{1}{9} \frac{1}{1+z} + \frac{19}{18} \frac{z}{(1-2z)^2} - \frac{1}{9} \frac{1}{(1-2z)^2}$
		</template>
		<template #e>
			$a_n = \frac{1}{9}(-1)^n + \frac{19}{36} n \cdot 2^n - \frac{1}{9} 2^n$
		</template>
	</MakeProblem>
</template>
