<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b' ]">
			<template #a>
				用高斯消去慢慢消。
				$$
				A^{-1} = \!\def\arraystretch{1.35}\begin{bmatrix}
				\frac{-1}{3} & 2 & 1 & -1 \\
				\frac{1}{3} & \frac{-4}{3} & \frac{-4}{3} & 1 \\
				\frac{5}{12} & \frac{-13}{12} & \frac{-11}{6} & 1 \\
				\frac{1}{12} & \frac{-1}{12} & \frac{1}{6} & 0
				\end{bmatrix}
				$$
			</template>
			<template #b>
				$$
				\begin{split}
				PA &= \!\begin{bmatrix} 0 & 1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}\! A \\
				&= \!\begin{bmatrix} 2 & 3 & -1 & 1 \\ 0 & -3 & 3 & 9 \\ 1 & 3 & -2 & 2 \\ 4 & 10 & -5 & 1 \end{bmatrix} \\
				\end{split}
				$$
			</template>
		</MultiOption>
	</vk>
</template>
