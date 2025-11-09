<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			A linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ such that
			$$T(1, 1) = (1, 0, 1) ~\text{ and }~ T(2, 3) = (1, -1, 2).$$
			Indicate which of the following statements are true?
		</template>
		<template #a>$T(14, 19) = (9, -5, 14)$</template>
		<template #b>$T(3, 4) = (2, -1, 3)$</template>
		<template #c>$T(4, 6) = (2, -2, 4)$</template>
		<template #d>$T(0, 1) = (0, -2, 6)$</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
