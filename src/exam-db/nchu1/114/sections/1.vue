<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Determine whether any of the propositions listed below are logically equivalent to $p \to (\neg q \land r)$:
		</template>
		<template #A>$(p \lor q) \land \neg r$</template>
		<template #B>$(\neg r \land q) \lor p$</template>
		<template #C>$(r \lor q) \land \neg p$</template>
		<template #D>$(r \land \neg q) \lor \neg p$</template>
		<template #E>None of the above.</template>
	</MakeProblem>
</template>
