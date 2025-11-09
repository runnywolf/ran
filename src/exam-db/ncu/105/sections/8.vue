<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Suppose every element in $A$ is different from others in $A$, and $|A| = 7,~ a \in A$.
			What about the following set $C$ is true?
			$$ C = \{ B \mid (((a \notin B) \to (|B| = 2)) \lor ((a \in B) \to (|B| = 3))) \land (B \subseteq A) \} $$
		</template>
		<template #a>$|C| = 2 @pm{6;2}$</template>
		<template #b>$|C| = @pm{6;2} + @pm{7;2}$</template>
		<template #c>$|C| = @pm{6;2} + @pm{7;3}$</template>
		<template #d>$C \supseteq A$</template>
		<template #e>$|C| > |A|$</template>
	</MakeProblem>
</template>
