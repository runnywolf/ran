<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $Q(x, y)$ be the statement “$x + y = x - y$”, which of the following are true?
		</template>
		<template #A>$\exists x \exists y ~ Q(x, y)$</template>
		<template #B>$\forall x \exists y ~ Q(x, y)$</template>
		<template #C>$\exists y \forall x ~ Q(x, y)$</template>
		<template #D>$\forall y \exists x ~ Q(x, y)$</template>
		<template #E>$\forall x \forall y ~ Q(x, y)$</template>
	</MakeProblem>
</template>
