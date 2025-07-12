<template>
	<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
		<template #problem>
			<span class="problem-score">(7 points)<br></span>
			Let <vl exp="A = \!\begin{bmatrix} 6 & 2 & 2 \\ -2 & 6 & 2 \end{bmatrix}\!" />,
			and consider the singular value decomposition (SVD) <vl exp="A = U \Sigma V^T" />.
		</template>
		<template #a>
			<span class="problem-score">(3 points)</span>
			Find <vl exp="U, \Sigma" />, and <vl exp="V" />.
		</template>
		<template #b>
			<span class="problem-score">(4 points)</span>
			Find orthonormal bases for <vl exp="C(A^T) ,~ N(A) ,~ C(A)" />, and <vl exp="N(A^T)" />,
			respectively, from the results obtained from SVD.
		</template>
	</MakeProblem>
</template>
