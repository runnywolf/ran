<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Determine and explain whether each of the following sets is a subspace of $\mathbb{R}^{2 \times 2}$.
			</template>
			<template #a>
				<span class="problem-score">(2 points)</span> The set of all 2x2 triangular matrices.
			</template>
			<template #b>
				<span class="problem-score">(2 points)</span> The set of all 2x2 lower triangular matrices.
			</template>
			<template #c>
				<span class="problem-score">(2 points)</span> The set of all 2x2 orthogonal matrices.
			</template>
		</MakeProblem>
	</vk>
</template>
