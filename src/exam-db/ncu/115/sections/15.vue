<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			For functions $f: C \to D$, $g: A \to B$, there exist a function composition $f \circ g$, and we know
			$f \circ g$ is an onto function. What about the following comparisons <span class="ran-underline">can be true</span>?
		</template>
		<template #a>$|A| = |B| = |C| \gt |D|$</template>
		<template #b>$|A| \lt |B| = |C| = |D|$</template>
		<template #c>$|A| \gt |B| = |C| \gt |D|$</template>
		<template #d>$|A| = |B| = |C| = |D|$</template>
		<template #e>$|A| = |B| \lt |C| = |D|$</template>
	</MakeProblem>
</template>
