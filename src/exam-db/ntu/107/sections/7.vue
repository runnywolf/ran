<template>
	<vk>
		<MakeProblem scoreText="(10%)">
			<template #problem>
				Let
				$
				A = { \!\begin{bmatrix}
				0 & 0 & 0 & 0 & a_0 \\
				-1 & 0 & 0 & 0 & a_1 \\
				0 & -1 & 0 & 0 & a_2 \\
				\vdots & \vdots & \vdots & \vdots & \vdots \\
				0 & 0 & 0 & -1 & a_{n-1}
				\end{bmatrix}\! }_{n \times n}
				$
				and $I_n$ be the $n \times n$ identity matrix. Find $\det(A + tI_n)$.
			</template>
		</MakeProblem>
	</vk>
</template>
