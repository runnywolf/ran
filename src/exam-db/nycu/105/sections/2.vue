<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Let $\{ x_1, x_2, x_3 \}$ be linearly independent (LID) vectors in $\mathbb{R}^n$.
				Determine and explain whether each of the following vector sets is LID.
			</template>
			<template #a>
				<span class="problem-score">(2 points)&nbsp;</span>
				$y_1 = x_1 + x_2,~ y_2 = x_2 + x_3$, and $y_3 = x_3 + x_1$.
			</template>
			<template #b>
				<span class="problem-score">(2 points)&nbsp;</span>
				$z_1 = x_2 - x_1,~ z_2 = x_3 - x_2$, and $z_3 = x_3 - x_1$.
			</template>
		</MakeProblem>
	</vk>
</template>
