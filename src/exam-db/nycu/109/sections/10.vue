<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
			<template #problem>
				The homogeneous coordinates map $\begin{bmatrix} x & y & z \end{bmatrix}^T$ to
				$\begin{bmatrix} x & y & z & 1 \end{bmatrix}^T$, that can help us format translation
				in the form of linear transformations. Consider the figure below.
				<div class="image">
					<img src="./img/10.webp">
				</div>
				There are two coordinate systems. One is with basis $B_1 = \{e_X, e_Y, e_Z\}$ and origin $o_1$,
				and the other is with basis $B_2 = \{e_U, e_V, e_W\}$ and origin $o_2$.
				Both $B_1$ and $B_2$ are orthonormal bases and obey the right‑handed convention.
				The relation between $B_1$ and $B_2$ is a rotation operation.
			</template>
			<template #a>
				<span class="problem-score">[3 points]</span>
				If $[e_X]_{B_2} = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix}^T$ and
				$[e_Y]_{B_2} = \begin{bmatrix} 0 & \frac{1}{2} & \frac{\sqrt{3}}{2} \end{bmatrix}^T$,
				please find $[e_Z]_{B_2}$.
			</template>
			<template #b>
				<span class="problem-score">[4 points]</span>
				Without considering translation, i.e., $o_1 = o_2$, please find a $3 \times 3$ rotation matrix
				that can transform $B_2$ coordinates to $B_1$ coordinates based on (a).
			</template>
			<template #c>
				<span class="problem-score">[3 points]</span>
				If $[o_1 - o_2]_{B_2} = \begin{bmatrix} 1 & 2 & 1 \end{bmatrix}^T$,
				please find $[o_1 - o_2]_{B_1}$ based on (a).
			</template>
			<template #d>
				<span class="problem-score">[5 points]</span>
				Find the linear transformation in the homogeneous coordinate system to transform
				$\begin{bmatrix} u & v & w & 1 \end{bmatrix}^T$ to $\begin{bmatrix} x & y & z & 1 \end{bmatrix}^T$
				based on (a) and (c). In details, please find the $4 \times 4$ matrix in the following equation.
				$$
				\begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}\!
				= \!\begin{bmatrix}
				r_{11} & r_{12} & r_{13} & t_1 \\
				r_{21} & r_{22} & r_{23} & t_2 \\
				r_{31} & r_{32} & r_{33} & t_3 \\
				0 & 0 & 0 & 1
				\end{bmatrix}\!
				\!\begin{bmatrix} u \\ v \\ w \\ 1 \end{bmatrix}
				$$
			</template>
		</MakeProblem>
	</vk>
</template>

<style scoped>
.image {
	margin: 10px 0;
	display: flex; justify-content: center;
}
</style>
