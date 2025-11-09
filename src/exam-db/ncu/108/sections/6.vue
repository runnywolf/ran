<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $R$ be a <span class="ran-bold">total order</span> relation,
			what following logical statements are true?
		</template>
		<template #A>$\forall x, y ,~ \neg R(x, y) \to R(y, x)$</template>
		<template #B>$\forall x, y ,~ (R(x, y) \land R(y, x)) \to (x = y)$</template>
		<template #C>$\exists x, \forall y ,~ R(x, y)$</template>
		<template #D>$\forall x, y ,~ (R^{-1}(x, y) \lor R^{-1}(y, x))$</template>
		<template #E>$\forall x ,~ \neg R^{-1}(x, x)$</template>
	</MakeProblem>
</template>
