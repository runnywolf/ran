<template>
	令
	$$
	x_1 = \!\begin{bmatrix} 1 \\ 0 \\ 1 \\ 0 \end{bmatrix}\! ,~~
	x_2 = \!\begin{bmatrix} 0 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! ,~~
	x_3 = \!\begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix}
	$$
	，$U = \text{span}\{x_1, x_2, x_3\}$。<br>
	<br>
	先求 $U^\perp$。<br>
	因為 $\dim(U) = 3 ,~ U \oplus U^\perp = \mathbb{R}^4$，所以 $\dim(U^\perp) = 1$，取一個向量
	$$x_4 = \!\begin{bmatrix} 0 \\ -1 \\ 0 \\ 1 \end{bmatrix}$$
	讓 $x_4$ 與 $x_1, x_2, x_3$ 垂直，$U^\perp = \text{span}\{x_4\}$。<br>
	<br>
	根據矩陣 $B$ 的定義，
	$$\begin{bmatrix} B x_1 & B x_2 & B x_3 & B x_4 \end{bmatrix} = \begin{bmatrix} A x_1 & A x_2 & A x_3 & 0 \end{bmatrix}$$
	$$\implies~~ B [x_1 ~~ x_2 ~~ x_3 ~~ x_4] = A [x_1 ~~ x_2 ~~ x_3 ~~ 0]$$
	，因此
	$$
	\begin{split}
	B &= A [x_1 ~~ x_2 ~~ x_3 ~~ 0] [x_1 ~~ x_2 ~~ x_3 ~~ x_4]^{-1} \\
	&= A \Big( [x_1 ~~ x_2 ~~ x_3 ~~ x_4] - [0 ~~ 0 ~~ 0 ~~ x_4] \Big) [x_1 ~~ x_2 ~~ x_3 ~~ x_4]^{-1} \\
	&= A I - A [0 ~~ 0 ~~ 0 ~~ x_4] [x_1 ~~ x_2 ~~ x_3 ~~ x_4]^{-1} \\
	&= A - \begin{bmatrix} 0 & 0 & 0 & 2 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 2 \end{bmatrix}\!
	(\frac{1}{2} \!\begin{bmatrix} 1 & 0 & 1 & 0 \\ 0 & 1 & 0 & 1 \\ -1 & 0 & 1 & 0 \\ 0 & -1 & 0 & 1 \end{bmatrix}\!) \\
	&= \begin{bmatrix} 2 & 0 & 0 & 2 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 2 & 0 & 0 & 2 \end{bmatrix}\! -
	\begin{bmatrix} 0 & -1 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & -1 & 0 & 1 \end{bmatrix} \\
	&= \begin{bmatrix} 2 & 1 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 2 & 1 & 0 & 1 \end{bmatrix}
	\end{split}
	$$
	，矩陣 $B$ 之中，$-2, -1, 0, 1, 2$ 的個數分別為
	$$\boxed{0, 0, 10, 4, 2}$$
</template>
