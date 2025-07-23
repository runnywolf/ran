<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Given
				$$
				A = \!\begin{bmatrix} 1 & 1 & 1 \\ 0 & 2 & 1 \\ 0 & 0 & 3 \\ \end{bmatrix}
				~~ \text{and} ~~ B = \begin{bmatrix} 2A & 2A \\ A & 3A \\ \end{bmatrix}\! \text{, please find}
				$$
			</template>
			<template #a>
				<span class="problem-score">(5 points)</span> the eigenvalues of $A$,
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span> the corresponding eigenvectors of $A$, and
			</template>
			<template #c>
				<span class="problem-score">(5 points)</span> the eigenvalues of $B$.
			</template>
		</MakeProblem>
	</vk>
</template>
