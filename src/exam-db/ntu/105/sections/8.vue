<template>
	<vk>
		<MakeProblem scoreText="(10%)">
			<template #problem>
				Please find the determinant of $A$.
				$$
				A = \!\begin{pmatrix}
				1 + x_1 & x_2 & x_3 & \cdots & x_n \\
				x_1 & 1 + x_2 & x_3 & \cdots & x_n \\
				x_1 & x_2 & 1 + x_3 & & \vdots \\
				\vdots & \vdots & & \ddots & \raisebox{0.3em}{$x_n$} \\
				x_1 & x_2 & \cdots & x_{n-1} & 1 + x_n
				\end{pmatrix}
				$$
			</template>
		</MakeProblem>
	</vk>
</template>
