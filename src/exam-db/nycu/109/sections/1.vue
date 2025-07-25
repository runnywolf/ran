<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['[3 points]', '[3 points]', '[3 points]']">
		<template #problem>
			Which of these relations on $\{0, 1, 2, 3\}$ are partial orderings?
			Note that a partial ordering relation is reflexive, antisymmetric, and transitive.
			If not a partial ordering relation, explain why it is not.
		</template>
		<template #a>$\{(0, 0), (1, 1), (2, 0), (2, 2), (2, 3), (3, 2), (3, 3)\}$</template>
		<template #b>$\{(0, 0), (1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (3, 3)\}$</template>
		<template #c>$\{(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 2), (3, 3)\}$</template>
	</MakeProblem>
</template>
