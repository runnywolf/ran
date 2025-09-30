<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			When using the generating function $g(z)$ to solve $P_n$ in the previous question,
			which of the following are true?
		</template>
		<template #A>
			$g(z)(1 - 6z - 12z^2) = 60z + 8$
		</template>
		<template #B>
			$g(z)(1 - 6z + 12z^2) = 12z + 8$
		</template>
		<template #C>
			$g(z) = @cf{4+2\sqrt{21}; 1-(3+\sqrt{21})z} + @cf{4-2\sqrt{21}; 1-(3-\sqrt{21})z}$
		</template>
		<template #D>
			$g(z) = @cf{4+(18/\sqrt{21}); 1-(3+\sqrt{21})z} + @cf{4-(18/\sqrt{21}); 1-(3-\sqrt{21})z}$
		</template>
		<template #E>
			$P_n = (4 + 18/\sqrt{21}){(3 + \sqrt{21})}^n + (4 - 18/\sqrt{21}){(3 - \sqrt{21})}^n$
		</template>
	</MakeProblem>
</template>
