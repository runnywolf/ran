<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['a', 'b', 'c', 'd', 'e']" useUlToListOptions>
			<template #problem>
				Which of the following statements are true?
			</template>
			<template #a>
				Let $A$ and $B$ be $n \times n$ matrices. Assume that $A$ is invertible and $B^3 = 0$.
				If $AB = BA$, then $A + B$ is also invertible.
			</template>
			<template #b>
				Let $S$ be the set of all sequences in $\mathbb{R}^\infty$ which have exactly $N$
				non‑zero elements where $N$ is a known constant. $S$ is a subspace of $\mathbb{R}^\infty$.
			</template>
			<template #c>
				Any square matrix $A$ can be represented as
				a sum of a symmetric matrix and a skew‑symmetric matrix.
			</template>
			<template #d>
				If $A$ and $B$ are similar, they have the same eigenvectors.
			</template>
			<template #e>
				If $A, B \in \mathbb{R}^{m \times n}$, $\text{rank}(A - B) \le \text{rank}(A) - \text{rank}(B)$.
			</template>
		</MakeProblem>
	</vk>
</template>
