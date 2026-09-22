<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			How many subsets with an odd number of elements does a set with 10 elements have?
		</template>
		<template #A>$2^9$</template>
		<template #B>$2^9+1$</template>
		<template #C>$2^{10}-1$</template>
		<template #D>$2^{10}$</template>
		<template #E>$2^{10}+1$</template>
	</MakeProblem>
</template>
