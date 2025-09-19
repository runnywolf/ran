<template>
	<vk>
		根據行列式分塊定理：
		$$
		\begin{vmatrix}
		3 - t & 2 & 0 & 0 & 0 \\
		1 & 4 - t & 0 & 0 & 0 \\
		0 & 0 & 3 - t & 1 & 0 \\
		0 & 0 & 1 & 3 - t & 0 \\
		0 & 0 & 0 & 0 & 4 - t
		\end{vmatrix}
		= \begin{vmatrix} 3 - t & 2 \\ 1 & 4 - t \end{vmatrix} \cdot
		\begin{vmatrix} 3 - t & 1 \\ 1 & 3 - t \end{vmatrix} (4 - t) = 0
		$$
		<br>
		解 $\begin{vmatrix} 3 - t & 2 \\ 1 & 4 - t \end{vmatrix} = 0$
		等同於解 $\begin{bmatrix} 3 & 2 \\ 1 & 4 \end{bmatrix}$ 的特徵值，<br>
		注意到 $t = 2$ 使行列式 $\begin{vmatrix} 1 & 2 \\ 1 & 2 \end{vmatrix} = 0$，因此另一個特徵根滿足
		$\text{tr}( \begin{bmatrix} 3 & 2 \\ 1 & 4 \end{bmatrix} ) = 2 + \lambda_2 = 7$，<br>
		得到 $t = 2, 5$。<br>
		<br>
		解 $\begin{vmatrix} 3 - t & 1 \\ 1 & 3 - t \end{vmatrix} = 0$
		等同於解 $\begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}$ 的特徵值，<br>
		注意到 $t = 2$ 使行列式 $\begin{vmatrix} 1 & 1 \\ 1 & 1 \end{vmatrix} = 0$，因此另一個特徵根滿足
		$\text{tr}( \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix} ) = 2 + \lambda_2 = 6$，<br>
		得到 $t = 2, 4$。<br>
		<br>
		$(4 - t) = 0 \quad \Rightarrow \quad t = 4$<br>
		<br>
		$$t = \boxed{ 2, 2, 4, 4, 5 }$$
	</vk>
</template>
