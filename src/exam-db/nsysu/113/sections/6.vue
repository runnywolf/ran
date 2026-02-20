<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[5%]', '[5%]']">
		<template #problem>
			Each of the following functions $f: \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ is a
			closed binary operation on $\mathbb{Z}$. Determine in each case whether $f$ is commutative and/or associative?
		</template>
		<template #a>$f(x, y) = 7x + 17y - 119xy$</template>
		<template #b>$f(x, y) = x^{3x+7} + y$</template>
	</MakeProblem>
</template>
