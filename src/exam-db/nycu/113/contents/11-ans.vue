<template>
	對 $C$ 進行 Cholesky 分解，令下三角矩陣
	$L = \!\begin{bmatrix} a & 0 & 0 \\ b & c & 0 \\ d & e & f \end{bmatrix}\!$，則
	$$
	C = L L^T = \!\begin{bmatrix} a & 0 & 0 \\ b & c & 0 \\ d & e & f \end{bmatrix}\!
	\!\begin{bmatrix} a & b & d \\ 0 & c & e \\ 0 & 0 & f \end{bmatrix}\!
	= \!\begin{bmatrix} a^2 & ab & ad \\ ab & b^2 + c^2 & bd+ce \\ ad & bd+ce & d^2 + e^2 + f^2 \end{bmatrix}\!
	= \!\begin{bmatrix} 9 & 3 & -6 \\ 3 & 4 & 1 \\ -6 & 1 & 7 \\ \end{bmatrix}
	$$
	$$
	\begin{split}
	a = 3 \quad &\implies \quad
	L L^T = \!\begin{bmatrix} 9 & 3b & 3d \\ * & b^2 + c^2 & bd+ce \\ * & * & d^2 + e^2 + f^2 \end{bmatrix} \\
	b = 1 ,~~ d = -2 \quad &\implies \quad
	L L^T = \!\begin{bmatrix} 9 & 3 & -6 \\ * & 1 + c^2 & -2+ce \\ * & * & 4 + e^2 + f^2 \end{bmatrix} \\
	c = \sqrt{3} \quad &\implies \quad
	L L^T = \!\begin{bmatrix} 9 & 3 & -6 \\ * & 4 & -2+e\sqrt{3} \\ * & * & 4 + e^2 + f^2 \end{bmatrix} \\
	e = \sqrt{3} \quad &\implies \quad
	L L^T = \!\begin{bmatrix} 9 & 3 & -6 \\ * & 4 & 1 \\ * & * & 7 + f^2 \end{bmatrix} \\
	f = 0 \quad &\implies \quad
	L L^T = \!\begin{bmatrix} 9 & 3 & -6 \\ * & 4 & 1 \\ * & * & 7 \end{bmatrix} \\
	\end{split}
	$$
	得到
	$$L = \!\begin{bmatrix} 3 & 0 & 0 \\ 1 & \sqrt{3} & 0 \\ -2 & \sqrt{3} & 0 \end{bmatrix} $$
</template>
