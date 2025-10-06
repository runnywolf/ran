<template>
	<MakeProblem listEndLabel="E">
		<template #problem>Which of the following logic equivalence statements are incorrect?</template>
		<template #A>$\forall x \, P(x) \land \forall x \, Q(x) \equiv \forall x \, (P(x) \land Q(x))$.</template>
		<template #B>$\forall x \, P(x) \lor \forall x \, Q(x) \equiv \forall x \, (P(x) \lor Q(x))$.</template>
		<template #C>$\exists x \, P(x) \land \exists x \, Q(x) \equiv \exists x \, (P(x) \land Q(x))$.</template>
		<template #D>$\exists x \, P(x) \lor \exists x \, Q(x) \equiv \exists x \, (P(x) \lor Q(x))$.</template>
		<template #E>
			$\forall x \, (P(x) \to A) \equiv \forall x \, P(x) \to A$.
			(Assume that $x$ does not occur as a free variable in $A$ and the domain of $x$ is nonempty.)
		</template>
	</MakeProblem>
</template>
