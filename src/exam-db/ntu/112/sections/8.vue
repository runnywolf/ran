<template>
	<MakeProblem scoreText="(10%)" listEndLabel="E">
		<template #problem>
			Assume that A, B, and C are $n \times n$ matrices.
		</template>
		<template #A>
			$\text{trace}((A+B)C) = \text{trace}(AC) + \text{trace}(BC)$
		</template>
		<template #B>
			$\text{trace}(AB) = \text{trace}(A)\text{trace}(B)$
		</template>
		<template #C>
			$\text{trace}(AB) = \text{trace}(BA)$
		</template>
		<template #D>
			Given a $2 \times 2$ matrix, $\left[ \begin{array}{cc} a & b+c \\ b-c & -a \end{array} \right]$
			with trace zero has real eigenvalues if $a^2 + b^2 \ge c^2$.
		</template>
		<template #E>
			Suppose a $2 \times 2$ matrix other than the identity matrix satisfies
			$A^3 = I$. Then we have $\text{trace}(A) = 1$.
		</template>
	</MakeProblem>
</template>
