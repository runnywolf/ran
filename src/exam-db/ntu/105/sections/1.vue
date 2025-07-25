<template>
	<MakeProblem scoreText="(5%)" listEndLabel="e">
		<template #problem>
			Let $A, B \in M_{n \times n}(F)$, where $F = \mathbb{C}$ or $\mathbb{R}$.
			Which of the following statements are true?
		</template>
		<template #a>$\text{tr}(AB) = \text{tr}(BA)$</template>
		<template #b>$\text{tr}(AB) = \text{tr}(A)\text{tr}(B)$</template>
		<template #c>$\text{tr}(B^{-1}AB) = \text{tr}(A)$</template>
		<template #d>$\text{tr}(A^k) = (\text{tr}(A))^k$</template>
		<template #e>$\text{tr}(A \pm B) = \text{tr}(A) \pm \text{tr}(B)$</template>
	</MakeProblem>
</template>
