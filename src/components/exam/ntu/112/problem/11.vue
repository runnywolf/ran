<template>
	<MakeProblem :score="10" :optionSlotNames="['A', 'B', 'C', 'D', 'E']" useUlToListOptions>
		<template #problem>
			Let <vl exp="T" /> be a self-adjoint operator on a finite-dimensional inner product space
			<vl exp="V" /> with distinct eigenvalues
			<vl exp="\lambda_1, \lambda_2, \,\cdots , \lambda_k" />.
			Let <vl exp="E_i" /> be the eigenspace of <vl exp="T" /> corresponding to
			<vl exp="\lambda_i" />, and let <vl exp="T_i" /> be the orthogonal projection of
			<vl exp="V" /> on <vl exp="E_i" />, <vl exp="1 \leq i \leq k" />.
		</template>
		<template #A>
			<vl exp="\! \sum_{i=1}^{k} \lambda_i T_i = T" />
		</template>
		<template #B>
			<vl exp="\! V = E_1 \oplus E_2 \oplus \cdots \oplus E_k" />
		</template>
		<template #C>
			Given any polynomial <vl exp="g" />,
			<vl exp="g(T) = g(\lambda_1) T_1 + g(\lambda_2) T_2 + \cdots + g(\lambda_k) T_k" />.
		</template>
		<template #D>
			<vl exp="\! \lambda_1, \lambda_2, \,\cdots , \lambda_k" /> are all real numbers.
		</template>
		<template #E>
			If <vl exp="T(x) = Ax" />, where <vl exp="x \in \mathbb{C}^n" />,
			then <vl exp="A" /> is diagonalizable.
		</template>
	</MakeProblem>
</template>
