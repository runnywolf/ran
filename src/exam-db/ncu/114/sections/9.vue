<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			$\!\begin{bmatrix} a_1 & b_1 & c_1 & d_1 \\ a_2 & b_2 & c_2 & d_2 \\ a_3 & b_3 & c_3 & d_3 \end{bmatrix}\!$
			is processed by row operations to form
			$\!\begin{bmatrix} 1 & 2 & 3 & 5 \\ 2 & 5 & 7 & 13 \\ 0 & 0 & 1 & 0 \end{bmatrix}\!$.
			Which of the following are true?
		</template>
		<template #a>
			$
			\begin{vmatrix} d_1 & d_2 & d_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}
			= \begin{vmatrix} b_1 & b_2 & b_3 \\ a_1 & a_2 & a_3 \\ c_1 & c_2 & c_3 \end{vmatrix}
			$
		</template>
		<template #b>
			After row operations,
			$\!\begin{bmatrix} a_1 & b_1 & c_1 & d_1 \\ a_2 & b_2 & c_2 & d_2 \\ a_3 & b_3 & c_3 & d_3 \end{bmatrix}\!$
			can become $\!\begin{bmatrix} 2 & -1 & 0 & -5 \\ 3 & 0 & -1 & -3 \\ 0 & 3 & -2 & 9 \end{bmatrix}\!$.
		</template>
		<template #c>
			If
			$
			\begin{cases}
			{a_1}^2 + {a_2}^2 + {a_3}^2 = 2 \\
			{b_1}^2 + {b_2}^2 + {b_3}^2 = 2 \\
			{d_1}^2 + {d_2}^2 + {d_3}^2 = 16
			\end{cases}
			$,
			then $|(a_1, a_2, a_3) \times (d_1, d_2, d_3)| = 4 \sqrt{2}$, where $\times$ is the cross product.
		</template>
		<template #d>
			$\begin{cases} a_1x + c_1y + 3b_1 = d_1 \\ a_2x + c_2y + 3b_2 = d_2 \end{cases}$ has a unique solution.
		</template>
		<template #e>
			$
			\begin{cases}
			(3b_1 + c_1)x - 2a_1y + d_1z + 2c_1 = 0 \\
			(3b_2 + c_2)x - 2a_2y + d_2z + 2c_2 = 0 \\
			(3b_3 + c_3)x - 2a_3y + d_3z + 2c_3 = 0
			\end{cases}
			$
			has a unique solution.
		</template>
	</MakeProblem>
</template>
