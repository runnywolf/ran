<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			6. Let $R$ be a total order relation, what following logical statements are true?
			A. $\forall x, y, (\neg R(x, y)) \rightarrow R(y, x)$
			B. $\forall x, y, ((R(x, y) \land R(y, x)) \rightarrow (x = y))$
			C. $\exists x, \forall y, R(x, y)$
			D. $\forall x, y, (R^{-1}(x, y) \lor R^{-1}(y, x))$
			E. $\forall x, \neg R^{-1}(x, x)$
		</template>
		<template #A></template>
		<template #B></template>
		<template #C></template>
		<template #D></template>
		<template #E></template>
	</MakeProblem>
</template>
