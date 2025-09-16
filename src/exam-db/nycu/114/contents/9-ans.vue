<template>
	令 $E_2$ 為 $\mathbb{R}^2$ 的標準基底，$E_3$ 為 $\mathbb{R}^3$ 的標準基底。<br>
	令 $A$ 為線性變換 $L: \mathbb{R}^2 \to \mathbb{R}^3$ 在標準基底下的矩陣表示，可以直接觀察出來：
	$$
	A \!\begin{bmatrix} x \\ y \end{bmatrix}\!
	= \!\begin{bmatrix} 5 & -3 \\ 1 & 1 \\ -3 & 2 \end{bmatrix}\! \!\begin{bmatrix} x \\ y \end{bmatrix}\!
	= \!\begin{bmatrix} 5x - 3y \\ x + y \\ -3x + 2y \end{bmatrix}\!
	$$
	$$A = \!\begin{bmatrix} 5 & -3 \\ 1 & 1 \\ -3 & 2 \end{bmatrix}\! = [L]_{E_3 \gets E_2}$$
	對於一組向量 $x_1, x_2, \cdots\!, x_n$ 構成的基底 $B$，$n \times n$
	矩陣 $P_{B} = [x_1 ~~ x_2 ~ \cdots ~ x_n]$ 為 $B \to E_n$
	的基底變換矩陣，若想要從基底 $E_n$ 變換到 $B$，求逆矩陣 $P_B^{-1}$ 即可。<br>
	<br>
	求線性變換 $L$ 在基底 $B_1$ 和 $B_2$ 下的矩陣表示：<br>
	因為 $[L]_{E_3 \gets E_2}$，所以需要先從維度 2 的 $B_1$ 變換到 $E_2$，基底變換矩陣為
	$P_{B_1} = \begin{bmatrix} 1 & 1 \\ 2 & 1 \end{bmatrix}$。<br>
	同理，$[L]_{E_3 \gets E_2}$ 的輸出在基底 $E_3$，因此需要從 $E_3$ 變換到 $B_2$，基底變換矩陣為
	$$
	P_{B_2}^{-1} = { \!\begin{bmatrix} 1 & 0 & 1 \\ 2 & 0 & 1 \\ 1 & 1 & 2 \end{bmatrix}\! }^{-1}
	= \begin{bmatrix} -1 & 1 & 0 \\ -3 & 1 & 1 \\ 2 & -1 & 0 \end{bmatrix}
	$$
	，所以
	$$
	\begin{split}
	[L]_{B_2 \gets B_1} &= P_{B_2}^{-1} [L]_{E_3 \gets E_2} P_{B_1} \\
	&= \!\begin{bmatrix} -1 & 1 & 0 \\ -3 & 1 & 1 \\ 2 & -1 & 0 \end{bmatrix}\!
	\!\begin{bmatrix} 5 & -3 \\ 1 & 1 \\ -3 & 2 \end{bmatrix}\!
	\!\begin{bmatrix} 1 & 1 \\ 2 & 1 \end{bmatrix}\! \\
	&= \boxed{ \!\begin{bmatrix} 4 & 0 \\ 7 & -5 \\ -5 & 2 \end{bmatrix} }
	\end{split}
	$$
</template>
