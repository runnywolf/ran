<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $P(x)$ indicates “$x$ is in the right place”, and $C(x)$ indicates “$x$ is in good condition”.
			The domain of all quantifiers is the set of your tools. Which of the following translations from logical
			expressions into English sentences are <span class="ran-bold">false</span>?
		</template>
		<template #A>$\exists x(\neg P(x))$: All of my tools are out of place.</template>
		<template #B>$\exists x(P(x) \land \neg C(x))$: Some tools are in the right place, but not in good condition.</template>
		<template #C>$\neg \forall x C(x)$: Not all of my tools are in good condition.</template>
		<template #D>$\forall x(C(x) \to P(x))$: All tools that are out of place are in good condition.</template>
		<template #E>$\forall x(C(x) \lor P(x))$: Every tool is either in the right place or in good condition.</template>
	</MakeProblem>
</template>
