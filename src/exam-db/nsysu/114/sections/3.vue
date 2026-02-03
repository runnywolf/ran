<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[5%]', '[5%]']">
		<template #problem>
			Let $A = \{1,2,3,4,5,6,7,8,9\}$ and $B = \{a,b,c,d,e,f,g,h\}$.
			Determine the number of functions $f: A \to B$, where
		</template>
		<template #a>$f(A) = \{a,b,c\}$</template>
		<template #b>$|f(A)| = 3$</template>
	</MakeProblem>
</template>
