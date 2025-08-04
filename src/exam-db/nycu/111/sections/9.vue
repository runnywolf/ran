<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(3 points)', '(4 points)']">
		<template #problem>
			<span class="problem-score">(7 points)<br></span>
			Let $A = \!\begin{bmatrix} 6 & 2 & 2 \\ -2 & 6 & 2 \end{bmatrix}\!$,
			and consider the singular value decomposition (SVD) $A = U \Sigma V^T$.
		</template>
		<template #a>
			Find $U, \Sigma$, and $V$.
		</template>
		<template #b>
			Find orthonormal bases for $C(A^T) ,~ N(A) ,~ C(A)$, and $N(A^T)$,
			respectively, from the results obtained from SVD.
		</template>
	</MakeProblem>
</template>
