<template>
	對 $D$ 進行 Cholesky 分解，由於 $D$ 是由左上的 $1 \times 1$ 分塊矩陣和右下的 $2 \times 2$ 分塊矩陣組成，<br>
	令下三角矩陣 $L = \!\begin{bmatrix} a & 0 & 0 \\ 0 & b & 0 \\ 0 & c & d \end{bmatrix}\!$，則
	$$
	D = L L^H = \!\begin{bmatrix} a & 0 & 0 \\ 0 & b & 0 \\ 0 & c & d \end{bmatrix}\!
	\!\begin{bmatrix} \overline{a} & 0 & 0 \\ 0 & \overline{b} & \overline{c} \\ 0 & 0 & \overline{d} \end{bmatrix}\!
	= \!\begin{bmatrix}
	a \overline{a} & 0 & 0 \\
	0 & b \overline{b} & b \overline{c} \\
	0 & c \overline{b} & c \overline{c} + d \overline{d}
	\end{bmatrix}\!
	= \!\begin{bmatrix} 4 & 0 & 0 \\ 0 & 1 & i \\ 0 & -i & 1 \end{bmatrix}
	$$
	$$
	\begin{split}
	a = 2 \quad &\implies \quad
	L L^H = \!\begin{bmatrix}
	4 & 0 & 0 \\
	0 & b \overline{b} & b \overline{c} \\
	0 & c \overline{b} & c \overline{c} + d \overline{d}
	\end{bmatrix} \\
	b = 1 \quad &\implies \quad
	L L^H = \!\begin{bmatrix} 4 & 0 & 0 \\ 0 & 1 & \overline{c} \\ 0 & c & c \overline{c} + d \overline{d} \end{bmatrix} \\
	c = -i \quad &\implies \quad
	L L^H = \!\begin{bmatrix} 4 & 0 & 0 \\ 0 & 1 & i \\ 0 & -i & 1 + d \overline{d} \end{bmatrix} \\
	d = 0 \quad &\implies \quad
	L L^H = \!\begin{bmatrix} 4 & 0 & 0 \\ 0 & 1 & i \\ 0 & -i & 1 \end{bmatrix}
	\end{split}
	$$
	$D = F^H F = L L^H$，所以
	$$
	F = L^H = {\!\begin{bmatrix} 2 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & -i & 0 \end{bmatrix}\!}^H
	= \boxed{ \!\begin{bmatrix} 2 & 0 & 0 \\ 0 & 1 & i \\ 0 & 0 & 0 \end{bmatrix} }
	$$
</template>
