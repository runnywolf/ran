<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[5 points]', '[5 points]']">
		<template #problem>
			Let $A = \!\begin{bmatrix} 2 & 1 & 1 \\ 6 & 4 & 5 \\ 4 & 1 & 3 \end{bmatrix}\!$,
		</template>
		<template #a>
			Find elementary matrices $F_1,~ F_2,$ and $F_3$ such that $F_3 F_2 F_1 A = U$,
			where $U$ is an upper triangular matrix.
		</template>
		<template #b>
			Determine the inverses of $F_1,~ F_2,$ and $F_3$ and set $L = F_1^{-1} F_2^{-1} F_3^{-1}$.
			What type of matrix is $L$? Verify that $A = LU$.
		</template>
	</MakeProblem>
</template>
