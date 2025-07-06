<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['a', 'b', 'c', 'd', 'e']" useUlToListOptions>
		<template #problem>
			Which of the following statements are true?
		</template>
		<template #a>
			Let <vl exp="D: V \to V" /> be defined by <vl exp="D(f) = \frac{df}{dt}" />,
			where <vl exp="V" /> is the space of functions with basis <vl exp="\{ \sin t, \cos t \}" />.
			The eigenvalues of <vl exp="D" /> are <vl exp="\pm 1" />.
		</template>
		<template #b>
			<vl exp="F" /> is linear if <vl exp="F: \mathbb{R}^3 \to \mathbb{R}^2" />
			is defined by <vl exp="F(x, y, z) = (x + 1 , y + z)" />.
		</template>
		<template #c>
			Assume that <vl exp="A \in M_{n \times n}(F)" /> has two distinct eigenvalues,
			<vl exp="\lambda_1" /> and <vl exp="\lambda_2" />.
			If <vl exp="\dim(E_{\lambda_1}) = n - 1" />, <vl exp="A" /> is diagonalizable.
		</template>
		<template #d>
			Let <vl exp="A, B" /> and <vl exp="C" /> be three <vl exp="n \times n" /> matrices
			such that for <vl exp="k = 1, 2, \cdots \!, n" />
			<vl c exp="
				\begin{alignat*}{1}
				& c_{ik} = a_{ik} + b_{ik}, \text{ for some } i; \\
				& a_{jk} = b_{jk} = c_{jk}, \text{ for } j \neq i.
				\end{alignat*}
			" />
			Then we have <vl exp="\det C = \det A + \det B" />.
		</template>
		<template #e>
			Let <vl exp="T" /> be a diagonalizable linear operator on a finite&#8209;dimensional vector space,
			and let <vl exp="m" /> be any positive integer.
			<vl exp="T" /> and <vl exp="T^m" /> are simultaneously diagonalizable.
		</template>
	</MakeProblem>
</template>
