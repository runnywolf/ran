<template>
	<MakeProblem scoreText="" listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #problem>
			Let $A$ be an $8 \times 5$ matrix of rank 3, and let $b$ be a nonzero vector in $N(A^T)$.
		</template>
		<template #a>
			Show that the system $Ax = b$ must be inconsistent.
		</template>
		<template #b>
			How many least squares solutions will there be to the system $Ax = b?$ Explain.
		</template>
	</MakeProblem>
</template>
