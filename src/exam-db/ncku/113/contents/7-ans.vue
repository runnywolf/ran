<template>
	<vk>
		令 $A_n$ 為行列式 $G_n$ 對應的矩陣，即 $G_n = \det(A_n)$。<br>
		由於
		$$
		A_n - (-1)I = \!\begin{bmatrix}
		1 & 1 & \cdots & 1 \\
		1 & 1 & \cdots & 1 \\
		\vdots & \vdots & \ddots & \vdots \\
		1 & 1 & \cdots & 1
		\end{bmatrix}_{n \times n}
		$$
		，可以發現有 $n-1$ 個特徵向量
		$$
		\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix} ,
		\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \\ \vdots \\ 0 \end{bmatrix} ,~
		\cdots ,
		\begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \\ -1 \end{bmatrix}
		$$
		對應至特徵值 $-1$，幾何重數為 $n-1$。<br>
		<br>
		$A_n$ 的所有特徵值的總和為 $\text{tr}(A_n)$，所以 $(n-1)(-1) + \lambda = 0$，<br>
		可知剩餘的未知特徵值為 $n-1$，幾何重數為 $1$。<br>
		<br>
		$A_n$ 的所有特徵值的積為 $\det(A_n)$，所以
		$$
		G_n = \det(A_n) = \boxed{ (-1)^{n-1} (n-1) }
		$$
	</vk>
</template>
