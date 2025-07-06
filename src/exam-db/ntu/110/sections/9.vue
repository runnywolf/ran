<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['a', 'b', 'c', 'd', 'e']" useUlToListOptions>
		<template #problem>
			Which of the following statements are true?
		</template>
		<template #a>
			Let <vl exp="A" /> and <vl exp="B" /> be <vl exp="n \times n" /> matrices.
			Assume that <vl exp="A" /> is invertible and <vl exp="B^3 = 0" />.
			If <vl exp="AB = BA" />, then <vl exp="A + B" /> is also invertible.
		</template>
		<template #b>
			Let <vl exp="S" /> be the set of all sequences in <vl exp="\mathbb{R}^\infty" />
			which have exactly <vl exp="N" /> non&#8209;zero elements where <vl exp="N" />
			is a known constant. <vl exp="S" /> is a subspace of <vl exp="\mathbb{R}^\infty" />.
		</template>
		<template #c>
			Any square matrix <vl exp="A" /> can be represented
			as a sum of a symmetric matrix and a skew&#8209;symmetric matrix.
		</template>
		<template #d>
			If <vl exp="A" /> and <vl exp="B" /> are similar, they have the same eigenvectors.
		</template>
		<template #e>
			If <vl exp="A, B \in \mathbb{R}^{m \times n}" />,
			<vl exp="\text{rank}(A - B) \le \text{rank}(A) - \text{rank}(B)" />.
		</template>
	</MakeProblem>
</template>
