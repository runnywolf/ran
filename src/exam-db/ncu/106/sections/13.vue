<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Determine which of the following systems of linear equations has a solution
		</template>
		<template #a>
			$ \begin{cases}
			x_1 + x_2 - x_3 + 2x_4 = 2 \\
			x_1 + x_2 + 2x_3 = 1 \\
			2x_1 + 2x_2 + x_3 + 2x_4 = 4
			\end{cases} $
		</template>
		<template #b>
			$ \begin{cases}
			x_1 + x_2 - x_3 = 1 \\
			2x_1 + x_2 + 3x_3 = 2
			\end{cases} $
		</template>
		<template #c>
			$ \begin{cases}
			x_1 + 2x_2 + 3x_3 = 1 \\
			x_1 + x_2 - x_3 = 0 \\
			x_1 + 2x_2 + x_3 = 3
			\end{cases} $
		</template>
		<template #d>
			$ \begin{cases}
			x_1 + x_2 + 3x_3 - x_4 = 0 \\
			x_1 + x_2 + x_3 + x_4 = 1 \\
			x_1 - 2x_2 + x_3 - x_4 = 1 \\
			4x_1 + x_2 + 8x_3 - x_4 = 0
			\end{cases} $
		</template>
		<template #e>
			$ \begin{cases}
			x_1 + 2x_2 - x_3 = 1 \\
			2x_1 + x_2 + 2x_3 = 3 \\
			x_1 - 4x_2 + 7x_3 = 4
			\end{cases} $
		</template>
	</MakeProblem>
</template>
