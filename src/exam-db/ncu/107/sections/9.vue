<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Suppose $x, y$ represents people. Let $S(x, y)$ be the predicate of
			<span class="ran-no-break">“$x$ is a senior of $y$”</span>, $F(x,y)$ be the predicate of
			<span class="ran-no-break">“$x$ is a friend of $y$”</span>, Choose the correct logic statement(s)
			which have the same meaning as the sentence.
			<span class="ran-bold ran-underline">At least one of any person’s senior is his friend.</span>
		</template>
		<template #A>$\forall x (\forall y,~ F(y,x) \to S(y,x))$.</template>
		<template #B>$\exists x (\forall y,~ S(x,y) \land F(y,x))$.</template>
		<template #C>$\forall x (\forall y,~ S(y,x) \to F(x,y))$.</template>
		<template #D>$\exists x (\forall y,~ F(y,x) \lor S(y,x))$.</template>
		<template #E>None of the above.</template>
	</MakeProblem>
</template>
