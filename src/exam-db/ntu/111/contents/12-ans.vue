<template>
	用矩陣列運算將 $U$ 的生成向量化簡為列梯矩陣，用於確定子空間的維度：
	$$
	\begin{bmatrix}
	1 & 3 & -2 & 2 & 3 \\
	1 & 4 & -3 & 4 & 2 \\
	2 & 3 & -1 & -2 & 9 \\
	2 & 4 & -2 & 0 & 8
	\end{bmatrix}
	\sim
	\begin{bmatrix}
	1 & 3 & -2 & 2 & 3 \\
	0 & 1 & -1 & 2 & -1 \\
	0 & 0 & 0 & 0 & 0 \\
	0 & 0 & 0 & 0 & 0 \\
	\end{bmatrix}
	= A_U
	\quad \implies \quad \dim(U) = 2
	$$
	以同樣的方法檢查 $W$ 的維度：
	$$
	\begin{bmatrix}
	1 & 3 & 0 & 2 & 1 \\
	1 & 5 & -6 & 6 & 3 \\
	2 & 5 & 3 & 2 & 1 \\
	2 & 7 & -3 & 6 & 3
	\end{bmatrix}
	\sim
	\begin{bmatrix}
	1 & 3 & 0 & 2 & 1 \\
	0 & 1 & -3 & 2 & 1 \\
	0 & 0 & 0 & 0 & 0 \\
	0 & 0 & 0 & 0 & 0
	\end{bmatrix}
	= A_W
	\quad \implies \quad \dim(W) = 2
	$$
	<br>
	由於 $\dim(U + W) = \dim(U) + \dim(W) - \dim(U \cap W)$，<br>
	因此只要求出 $\dim(U + W)$ 即可計算 $\dim(U \cap W)$：
	$$
	\begin{bmatrix} A_U \\ A_W \end{bmatrix}
	= \begin{bmatrix}
	1 & 3 & -2 & 2 & 3 \\
	0 & 1 & -1 & 2 & -1 \\
	1 & 3 & 0 & 2 & 1 \\
	0 & 1 & -3 & 2 & 1
	\end{bmatrix}
	\sim
	\begin{bmatrix}
	1 & 3 & -2 & 2 & 3 \\
	0 & 1 & -1 & 2 & -1 \\
	0 & 0 & 1 & 0 & -1 \\
	0 & 0 & 0 & 0 & 0
	\end{bmatrix}
	\quad \implies \quad \dim(U + W) = 3
	$$
	$$
	\begin{split}
	&\implies ~~ 3 = 2 + 2 - \dim(U \cap W) \\
	&\implies ~~ \dim(U \cap W) = 1
	\end{split}
	$$
</template>
