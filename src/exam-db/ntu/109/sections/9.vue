<template>
	<vk>
		<MakeProblem scoreText="(10%)">
			<template #problem>
				Let
				$$A = \begin{bmatrix} 2 & 0 & 0 & 2 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 2 & 0 & 0 & 2 \end{bmatrix}.$$
				Let
				$$
				U = \left\{
				a \begin{bmatrix} 1 \\ 0 \\ 1 \\ 0 \end{bmatrix}
				+ b \begin{bmatrix} 0 \\ 1 \\ 0 \\ 1 \end{bmatrix}
				+ c \begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix} : a, b, c \in \mathbb{R}
				\right\} .
				$$
				The numbers of elements $-2, -1, 0, 1, 2$ in a matrix $B$ with
				$$Bx = \begin{cases} Ax & \text{if } x \in U \\ 0 & \text{if } x \in U^\perp. \end{cases}$$
				are ____, ____, ____, ____, ____, respectively.
			</template>
		</MakeProblem>
	</vk>
</template>
