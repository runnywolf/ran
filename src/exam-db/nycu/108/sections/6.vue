<template>
	<MakeProblem listEndLabel="d" :listItemScoreTexts="['(2 points)', '(2 points)', '(2 points)', '(2 points)']">
		<template #problem>
			Let $Q(x)$ be the statement “$x + 1 \gt 2x$”. If the domain consists of all integers, what are these truth values?
		</template>
		<template #a>$\exists x ~ Q(x)$</template>
		<template #b>$\forall x ~ Q(x)$</template>
		<template #c>$\exists x ~ \neg Q(x)$</template>
		<template #d>$\forall x ~ \neg Q(x)$</template>
	</MakeProblem>
</template>
