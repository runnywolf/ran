<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				<span class="problem-score">(7 points)<br></span>
				Let $A = \!\begin{bmatrix} 6 & 2 & 2 \\ -2 & 6 & 2 \end{bmatrix}\!$,
				and consider the singular value decomposition (SVD) $A = U \Sigma V^T$.
			</template>
			<template #a>
				<span class="problem-score">(3 points)</span> Find $U, \Sigma$, and $V$.
			</template>
			<template #b>
				<span class="problem-score">(4 points)</span>
				Find orthonormal bases for $C(A^T) ,~ N(A) ,~ C(A)$, and $N(A^T)$,
				respectively, from the results obtained from SVD.
			</template>
		</MakeProblem>
	</vk>
</template>
