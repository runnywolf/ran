<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']" useUlToListOptions>
		<template #problem>
			Assume that A, B, and C are <vl exp="n \times n" /> matrices.
		</template>
		<template #A>
			<vl exp="\! \text{trace}((A+B)C) = \text{trace}(AC) + \text{trace}(BC)" />
		</template>
		<template #B>
			<vl exp="\! \text{trace}(AB) = \text{trace}(A)\text{trace}(B)"/>
		</template>
		<template #C>
			<vl exp="\! \text{trace}(AB) = \text{trace}(BA)"/>
		</template>
		<template #D>
			Given a <vl exp="2 \times 2" /> matrix,
			<vl exp="\left[ \begin{array}{cc} a & b+c \\ b-c & -a \end{array} \right]" />
			with trace zero has real eigenvalues if <vl exp="a^2 + b^2 \ge c^2" />.
		</template>
		<template #E>
			Suppose a <vl exp="2 \times 2" /> matrix other than the identity matrix satisfies
			<vl exp="A^3 = I" />. Then we have <vl exp="\text{trace}(A) = 1" />.
		</template>
	</MakeProblem>
</template>
