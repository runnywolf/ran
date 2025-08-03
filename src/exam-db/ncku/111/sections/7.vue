<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #problem>
			Let
			$$
			{\|A\|}_F = (\langle A, A \rangle)^{1/2}
			= \left( \sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}^2 \right)^{1/2}
			\quad \text{for}~ A \in \mathbb{R}^{m \times n} .
			$$
			The trace of an $n \times n$ matrix $C$, denoted $\text{tr}(C)$, is the sum of its diagonal entries; that is,
			$$\text{tr}(C) = c_{11} + c_{22} + \cdots + c_{nn}$$
			If $A$ and $B$ are $m \times n$ matrices, show that
		</template>
		<template #a>${\|A\|}_F^2 = \text{tr}(A^T A)$</template>
		<template #b>${\|A + B\|}_F^2 = {\|A\|}_F^2 + 2\text{tr}(A^T B) + {\|B\|}_F^2$</template>
	</MakeProblem>
</template>
