<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Consider a matrix $A = \!\begin{bmatrix} a & b \\ 0 & c \end{bmatrix}\!$, $a \neq c$.
			</template>
			<template #a>
				<span class="problem-score">(6 points)</span>
				Factor the matrix $A$ into $X D X^{-1}$ where $D$ is diagonal.
			</template>
			<template #b>
				<span class="problem-score">(4 points)</span>
				Calculate $e^A$.
			</template>
		</MakeProblem>
	</vk>
</template>
