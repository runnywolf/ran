<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Let $C = \!\begin{bmatrix} 3 & -1 & -2 \\ 2 & 0 & -2 \\ 2 & -1 & -1 \end{bmatrix}\!$ is an 3x3 matrix.
			</template>
			<template #a>
				<span class="problem-score">(5 points)</span>
				Please find the value of $\lim\limits_{n \to \infty} C^n$.
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span>
				Please compute the value of $e^C$.
			</template>
		</MakeProblem>
	</vk>
</template>
