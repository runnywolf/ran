<template>
	<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
		<template #problem>
			Given
			<vl c exp="
				A = \!\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 2 & 0 \\ 0 & 1 & 0 \end{bmatrix}\!
				\text{ and }
				b = \!\begin{bmatrix} 1 \\ 1 \\ 1 \\ 1 \end{bmatrix}
			" />
			If the Gram-Schmidt process is applied to determine an orthonormal basis for
			<vl exp="R(A) = \{b \in R^m ~|~ b = A_{mn}x\}" /> and <vl exp="QR" /> factorization of
			<vl exp="A" />, then, after the first one orthonormal vector <vl exp="q_1" /> and
			<vl exp="r_{11}" /> are computed, we have
			<vl c exp="
				Q = [q_1 \quad q_2 \quad q_3]
				= \!\begin{bmatrix} 0.5\sqrt{2} & - & - \\ 0 & - & - \\ 0.5\sqrt{2} & - & - \\ 0 & - & - \end{bmatrix}\!
				\text{ and }
				R = \!\begin{bmatrix} r_{11} & r_{12} & r_{13} \\ 0 & r_{22} & r_{23} \\ 0 & 0 & r_{33} \end{bmatrix}\!
				= \!\begin{bmatrix} \sqrt{2} & - & - \\ 0 & - & - \\ 0 & - & - \end{bmatrix} .
			" />
		</template>
		<template #a>
			<span class="problem-score">(5 points)</span>
			Finish above process and determine <vl exp="q_2" /> and <vl exp="q_3" />
			fill in the columns of <vl exp="Q" />.
		</template>
		<template #b>
			<span class="problem-score">(5 points)</span>
			Finish above process and determine <vl exp="R" />.
		</template>
		<template #c>
			<span class="problem-score">(5 points)</span>
			Use the <vl exp="QR" /> factorization to find the least squares solution of <vl exp="Ax = b" />.
		</template>
	</MakeProblem>
</template>
