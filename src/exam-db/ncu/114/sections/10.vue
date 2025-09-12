<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Which of the determinants of the following matrices are zero?
		</template>
		<template #a>
			$\rule{0em}{3.8em} \!\!\begin{bmatrix}
			0 & 3 & 2 & 6 & 3 \\
			-3 & 0 & 1 & 3 & 2 \\
			-2 & -1 & 0 & 5 & 3 \\
			-6 & -3 & -5 & 0 & 4 \\
			-3 & -2 & -3 & -4 & 0
			\end{bmatrix}$
		</template>
		<template #b>
			$\rule{0em}{3.8em} \!\!\begin{bmatrix}
			1 & 3 & 2 & 4 & 3 \\
			5 & 4 & 1 & 3 & 2 \\
			2 & 5 & 2 & 5 & 3 \\
			2 & 6 & 4 & 8 & 6 \\
			4 & 7 & 8 & 7 & 9
			\end{bmatrix}$
		</template>
		<template #c>
			$\rule{0em}{3.8em} \!\!\begin{bmatrix}
			1 & 1 & 0 & 0 & 0 \\
			-1 & 3 & 1 & 0 & 0 \\
			0 & -1 & 3 & 1 & 0 \\
			0 & 0 & -1 & 3 & 1 \\
			0 & 0 & 0 & -1 & 3
			\end{bmatrix}$
		</template>
		<template #d>
			$\rule{0em}{3.8em} \!\!\begin{bmatrix}
			1 & 1 & 0 & 0 & 0 \\
			1 & 1 & 1 & 0 & 0 \\
			0 & 1 & 1 & 1 & 0 \\
			0 & 0 & 1 & 1 & 1 \\
			0 & 0 & 0 & 1 & 1
			\end{bmatrix}$
		</template>
		<template #e>
			$\rule{0em}{3.8em} \!\!\begin{bmatrix}
			1 & 2 & 3 & 4 & 0 \\
			2 & 4 & 2 & 0 & 0 \\
			3 & 2 & 0 & 0 & 0 \\
			4 & 0 & 0 & 4 & 0 \\
			0 & 0 & 0 & 0 & 1
			\end{bmatrix}$
		</template>
	</MakeProblem>
</template>
