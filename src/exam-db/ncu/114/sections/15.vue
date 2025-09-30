<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			To solve the recurrence relation $a_n = 4a_{n-1} - 4a_{n-2},~ a_0 = 0,~ a_1 = 1/2$,
			what of the followings are true? (generating function $f(z)$ for this recurrence relation)
		</template>
		<template #a>
			$G(z)(1 - 4z + 4z^2) = @f{1;1+z} - 1 + @f{3;2} z$
		</template>
		<template #b>
			$G(z)(1 - 4z + 4z^2) = @f{1;1+z} - 1 + z$
		</template>
		<template #c>
			$G(z) = -@f{1;9} @f{1;1+z} + @f{7;9} @f{z;(1-2z)^2} + @f{1;9} @f{1;(1-2z)^2}$
		</template>
		<template #d>
			$G(z) = @f{1;9} @f{1;1+z} + @f{19;18} @f{z;(1-2z)^2} - @f{1;9} @f{1;(1-2z)^2}$
		</template>
		<template #e>
			$a_n = @f{1;9}(-1)^n + @f{19;36} n \cdot 2^n - @f{1;9} 2^n$
		</template>
	</MakeProblem>
</template>
