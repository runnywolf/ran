<template>
	<vk>
		<MakeProblem scoreText="(5%)" :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e' ]" useUlToListOptions>
			<template #problem>
				Let $A, B \in M_{n \times n}(F)$, where $F = \mathbb{C}$ or $\mathbb{R}$.
				Which of the following statements are true?
			</template>
			<template #a>$\det(AB) = \det(BA)$</template>
			<template #b>$\det(AB) = \det(A)\det(B)$</template>
			<template #c>$\det(B^{-1}AB) = \det(A)$</template>
			<template #d>$\det(A^k) = (\det(A))^k$</template>
			<template #e>$\det(A \pm B) = \det(A) \pm \det(B)$</template>
		</MakeProblem>
	</vk>
</template>
