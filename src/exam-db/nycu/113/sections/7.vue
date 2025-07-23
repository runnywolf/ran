<template>
	<vk>
		<MakeProblem scoreText="(12 points)" :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Let
				$$ A = \!\begin{bmatrix} 0 & -3 & 3 & 9 \\ 2 & 3 & -1 & 1 \\ 1 & 3 & -2 & 2 \\ 4 & 10 & -5 & 1 \end{bmatrix} $$
			</template>
			<template #a>
				<span class="problem-score">(6 points)</span>
				Find the $A^{-1} = {?}$
			</template>
			<template #b>
				<span class="problem-score">(6 points)</span>
				Find the $PA = LU$ factorization for $A$, where $P$ is a permutation matrix,
				$L$ is a lower triangular matrix with unit diagonal, and $U$ is an upper triangular matrix.
			</template>
		</MakeProblem>
	</vk>
</template>
