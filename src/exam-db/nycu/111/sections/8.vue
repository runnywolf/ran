<template>
	<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
		<template #problem>
			<span class="problem-score">(12 points)<br></span>
			Let
			<vl exp="
				A = \!\begin{bmatrix} 4 & -1 \\ 6 & -1 \end{bmatrix}\! ,~
				B = \!\begin{bmatrix} 1 & 1 & 1 \\ 0 & 1 & 0 \\ 0 & 0.5 & 1.5 \end{bmatrix}\!
			" />,
			and <vl exp="C = \!\begin{bmatrix} 4 & -4.5 \\ 2 & -2 \end{bmatrix}\!" />.
		</template>
		<template #a>
			<span class="problem-score">(6 points)</span>
			Check the diagonalizability of each of the above matrices.
			If it is diagonalizable, please diagonalize it; otherwise, clearly explain why it is not.
		</template>
		<template #b>
			<span class="problem-score">(3 points)</span>
			Find <vl exp="A^8" /> and <vl exp="A^{\infty}" />.
		</template>
		<template #c>
			<span class="problem-score">(3 points)</span>
			Find <vl exp="\det(B + 6I_3)" /> using eigenvalues.
		</template>
	</MakeProblem>
</template>
