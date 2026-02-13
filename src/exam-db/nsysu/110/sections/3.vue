<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #a>
			Prove that if 169 integers are selected from $\{1, 2, 3, \cdots\!, 336\}$,
			then the selection must include two integers $x, y$, where $x \mid y$ or $y \mid x$.
		</template>
		<template #b>Write a statement that generalizes the results of part (a).</template>
	</MakeProblem>
</template>
