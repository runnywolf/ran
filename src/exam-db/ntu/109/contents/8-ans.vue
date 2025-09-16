<template>
	若矩陣 $A \in \mathbb{R}^{n \times m},~ B \in \mathbb{R}^{m \times n},~ n \gt m$，則
	$AB$ 的特徵值會比 $BA$ 多出 $n-m$ 個 $0$。<br>
	$$B^T B = \!\begin{bmatrix} 4 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$
	對角矩陣的對角線為特徵值，所以 $B^T B$ 的特徵值為 $0, 1, 2, 4$，可知 $B B^T$ 的特徵值為 $0, 0, 1, 2, 4$，<br>
	$\lambda = 0, 1, 2, 3, 4$ 的代數重數分別為 $2, 1, 1, 0, 1$。<br>
	<br>
	$B B^T - \lambda I$ 的零化度為特徵值 $\lambda$ 的幾何重數，$1 \le$ 幾何重數 $\le$ 代數重數，<br>
	，因此 $\lambda = 1, 2, 4$ 的幾何重數皆為 $1$，而特徵值 $0$ 的幾何重數有可能為 $1, 2$，需要確認一下：
	$$B B^T - 0I = \!\begin{bmatrix}
	1 & 0 & 0 & 0 & -1 \\
	0 & 4 & 0 & 0 & 0 \\
	0 & 0 & 0 & 0 & 0 \\
	0 & 0 & 0 & 1 & 0 \\
	-1 & 0 & 0 & 0 & 1 \\
	\end{bmatrix}$$
	可以發現兩個線性獨立的向量使 $(B B^T - 0I) x = 0$：
	$$
	x = \!\begin{bmatrix} 1 \\ 0 \\ 0 \\ 0 \\ 1 \end{bmatrix} ,~ \begin{bmatrix} 0 \\ 0 \\ 1 \\ 0 \\ 0 \end{bmatrix}
	$$
	因此 $\lambda = 0$ 的幾何重數為 $2$。<br>
	當 $\lambda = 0, 1, 2, 3, 4$ 時，矩陣 $B B^T - \lambda I$ 的零化度為
	$$\boxed{2, 1, 1, 0, 1}$$
</template>
