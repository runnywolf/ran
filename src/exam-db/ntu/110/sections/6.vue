<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #a>
			Suppose $U$ and $V$ are distinct six‑dimensional subspaces
			of a vector space $W$ and $\dim W = 8$.
			Find $\dim(U \cap V)$.
		</template>
		<template #b>
			Let $V$ be a vector space of all symmetric $2 \times 2$ matrices.<br>
			Define a linear transformation $T: V \to P_2(\mathbb{R})$ by
			$$ T\left( \begin{bmatrix} a & b \\ b & c \end{bmatrix} \right) = (a-b) + (b-c)x + (c-a)x^2. $$
			Find $\operatorname{rank}(T)$.
		</template>
	</MakeProblem>
</template>
