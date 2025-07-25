<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(3 points)', '(3 points)', '(3 points)']">
		<template #problem>
			Determine whether each of the following conditional statements is a tautology or not.
			If yes, provide a proof. If no, provide a counter example.
		</template>
		<template #a>$p \to (\neg q \lor r)$</template>
		<template #b>$\neg p \to (q \to r)$</template>
		<template #c>$(p \to q) \lor (\neg p \to r)$</template>
	</MakeProblem>
</template>
