<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']" useUlToListOptions>
			<template #problem>
				Which ones of the following sets are linearly independent?
				Points will be counted only if all the answers are correct.
			</template>
			<template #A>
				$\{ -x^2 + 3x + 6 , x^3 + 2 , x^3 - 3x^2 + 5 \}$ in $P_3(R)$
			</template>
			<template #B>
				$
				\left\{
				\!\begin{pmatrix} 0 & -1 \\ 1 & 1 \end{pmatrix}\!,
				\!\begin{pmatrix} -1 & 2 \\ 0 & 0 \end{pmatrix}\!,
				\!\begin{pmatrix} 2 & 1 \\ 0 & 0 \end{pmatrix}\!,
				\!\begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}\!
				\right\}
				$
				in $M_{2 \times 2}(R)$
			</template>
			<template #C>
				$
				\left\{
				\!\begin{pmatrix} 1 & 1 \\ 0 & 0 \\ 0 & 0 \end{pmatrix}\!,
				\!\begin{pmatrix} 0 & 0 \\ 1 & 1 \\ 0 & 0 \end{pmatrix}\!,
				\!\begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 1 & 1 \end{pmatrix}\!,
				\!\begin{pmatrix} 1 & 0 \\ 1 & 0 \\ 1 & 0 \end{pmatrix}\!,
				\!\begin{pmatrix} 0 & 1 \\ 0 & 1 \\ 0 & 1 \end{pmatrix}\!
				\right\}
				$
				in $M_{3 \times 2}(R)$
			</template>
			<template #D>
				$
				\left\{
				\!\begin{pmatrix} 2 \\ 1 \\ 2 \\ -1 \end{pmatrix}\!,
				\!\begin{pmatrix} 1 \\ 0 \\ 1 \\ 0 \end{pmatrix}\!,
				\!\begin{pmatrix} 3 \\ 1 \\ 3 \\ -1 \end{pmatrix}\!,
				\!\begin{pmatrix} 1 \\ 1 \\ 1 \\ -1 \end{pmatrix}\!
				\right\}
				$
				in $R^4$
			</template>
			<template #E>
				$
				\left\{
				\!\begin{pmatrix} 1 \\ -1 \\ 3 \end{pmatrix}\!,
				\!\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}\!,
				\!\begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}\!
				\right\}
				$
				in $R^3$
			</template>
		</MakeProblem>
	</vk>
</template>
