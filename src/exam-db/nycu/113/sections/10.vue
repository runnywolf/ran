<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(5 points)', '(5 points)', '(5 points)']">
		<template #problem>
			Given
			$$
			A = \!\begin{bmatrix} 1 & 1 & 1 \\ 0 & 2 & 1 \\ 0 & 0 & 3 \\ \end{bmatrix}
			~~ \text{and} ~~ B = \begin{bmatrix} 2A & 2A \\ A & 3A \\ \end{bmatrix}\! \text{, please find}
			$$
		</template>
		<template #a>the eigenvalues of $A$,</template>
		<template #b>the corresponding eigenvectors of $A$, and</template>
		<template #c>the eigenvalues of $B$.</template>
	</MakeProblem>
</template>
