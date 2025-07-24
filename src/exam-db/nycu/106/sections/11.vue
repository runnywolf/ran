<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]" useUlToListOptions>
			<template #problem>
				Answer true (T) or false (F) to each of the following statements.
			</template>
			<template #a>
				<span class="problem-score">(1 point)</span>
				Let $L : \mathbb{R}^n \rightarrow \mathbb{R}^n$ be a linear operator.
				If $L(x_1) = L(x_2)$, then the vectors $x_1$ and $x_2$ must be equal.
			</template>
			<template #b>
				<span class="problem-score">(1 point)</span>
				An orthogonal matrix must have an eigenvalue $\lambda = 1$.
			</template>
			<template #c>
				<span class="problem-score">(1 point)</span>
				A Markov matrix must have an eigenvalue $\lambda = 1$.
			</template>
			<template #d>
				<span class="problem-score">(1 point)</span>
				A projection matrix has only two eigenspaces and each is an orthogonal complement to the other.
			</template>
			<template #e>
				<span class="problem-score">(1 point)</span>
				Singular matrices are never diagonalizable.
			</template>
			<template #f>
				<span class="problem-score">(1 point)</span>
				For a real symmetric matrix, all of its eigenvalues are always real and
				all of its eigenvectors corresponding to different eigenvalues are always mutually orthogonal.
			</template>
			<template #g>
				<span class="problem-score">(1 point)</span>
				For a square matrix, the product of its pivots is always equal to the product of its eigenvalues.
			</template>
			<template #h>
				<span class="problem-score">(1 point)</span>
				A symmetric matrix cannot be similar to a non‑symmetric matrix.
			</template>
			<template #i>
				<span class="problem-score">(1 point)</span>
				If $A A^T = A^T A$, then $A$ and $A^T$ always share the same eigenvalues.
			</template>
			<template #j>
				<span class="problem-score">(1 point)</span>
				Singular values of any matrix are all nonnegative real numbers.
			</template>
		</MakeProblem>
	</vk>
</template>
