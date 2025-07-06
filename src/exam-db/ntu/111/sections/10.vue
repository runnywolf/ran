<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Given
			<vl exp="
				A =
				\!\begin{bmatrix}
				9 & -1 & 5 & 7 \\
				8 & 3 & 2 & -4 \\
				0 & 0 & 3 & 6 \\
				0 & 0 & -1 & 8
				\end{bmatrix}\!
			" />.
			The largest eigenvalue is
		</template>
		<template #A>6</template>
		<template #B>7</template>
		<template #C>8</template>
		<template #D>9</template>
		<template #E>10</template>
	</MakeProblem>
</template>
