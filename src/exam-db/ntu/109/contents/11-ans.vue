<template>
	<vk>
		$A$ 的特徵多項式為
		$$ p_A(t) = \begin{vmatrix} 4-t & 4 & 2 & 1 \\ 0 & -t & -1 & -1 \\ -1 & -1 & 2-t & 0 \\ 1 & 1 & -1 & 1-t \end{vmatrix} $$
		將第 1 行乘 $-1$ 倍加到第 2 行，行列式的值不變：
		$$ = \begin{vmatrix} 4-t & t & 2 & 1 \\ 0 & -t & -1 & -1 \\ -1 & 0 & 2-t & 0 \\ 1 & 0 & -1 & 1-t \end{vmatrix} $$
		將第 2 列乘 $1$ 倍加到第 1 列，行列式的值不變：
		$$ = \begin{vmatrix} 4-t & 0 & 1 & 0 \\ 0 & \boxed{-t} & -1 & -1 \\ -1 & 0 & 2-t & 0 \\ 1 & 0 & -1 & 1-t \end{vmatrix} $$
		對第 2 行降階：
		$$ = -t \begin{vmatrix} 4-t & 1 & 0 \\ -1 & 2-t & 0 \\ 1 & -1 & \boxed{1-t} \end{vmatrix} $$
		對第 3 行降階：
		$$
		\begin{split}
		&= -t(1-t) \begin{vmatrix} 4-t & 1 \\ -1 & 2-t \end{vmatrix} \\
		&= -t(1-t) [ (4-t)(2-t) + 1 ] \\
		&= -t(1-t)(3-t)^2
		\end{split}
		$$
		$A$ 的特徵值為 $0, 1, 3, 3$，<br>
		特徵值 $3$ 的代數重數為 $2$，需要檢查 $4 - \dim(A - 3I)$ (幾何重數)，以確定若爾當塊的形式：
		$$
		\begin{split}
		A - 3I &= \!\begin{bmatrix} 1 & 4 & 2 & 1 \\ 0 & -3 & -1 & -1 \\ -1 & -1 & -1 & 0 \\ 1 & 1 & -1 & -2 \end{bmatrix} \\
		&\sim \!\begin{bmatrix} 1 & 4 & 2 & 1 \\ 0 & -3 & -1 & -1 \\ 0 & 3 & 1 & 1 \\ 0 & -3 & -3 & -3 \end{bmatrix} \\
		&\sim \!\begin{bmatrix} 1 & 4 & 2 & 1 \\ 0 & -3 & -1 & -1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & -2 & -2 \end{bmatrix}
		\end{split}
		$$
		特徵值 $3$ 的幾何重數 $1 \le$ 代數重數 $2$，因此特徵值 $0, 1, 3$ 對應的若爾當塊分別為
		$$ J_1 = [0] ,~~ J_2 = [1] ,~~ J_3 = \!\begin{bmatrix} 3 & 1 \\ 0 & 3 \end{bmatrix} $$
		，可知 $A$ 的若爾當標準型為
		$$
		J = \!\begin{bmatrix} J_1 & & \\ & J_2 & \\ & & J_3 \end{bmatrix}\!
		= \!\begin{bmatrix} 0 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 3 & 1 \\ 0 & 0 & 0 & 3 \end{bmatrix}
		$$
		，矩陣 $J$ 之中，$0, 1, 2, 3, 4$ 的個數分別為
		$$\boxed{12, 2, 0, 2, 0}$$
	</vk>
</template>
