<template>
	$$
	W = \text{span}(S) = \text{span}(
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! ,
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}\! )
	$$
	因為
	$
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! +
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! +
	\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! =
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}\!
	$，因此刪除子空間 $W$ 的多餘向量：
	$$
	W = \text{span}(
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! )
	$$
	調整子空間 $W$ 的向量：
	$$
	\begin{split}
	W &= \text{span}(
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! +
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ) \\
	&= \text{span}(
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}\! )
	\end{split}
	$$
	<div class="ts-divider"></div>
	$$
	V = \text{span}(R) = \text{span}(
	\!\begin{bmatrix} 1 \\ -2 \\ 1 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix}\! )
	$$
	調整子空間 $V$ 的向量：
	$$
	\begin{split}
	V &= \text{span}(
	\!\begin{bmatrix} 1 \\ -2 \\ 1 \\ 0 \end{bmatrix}\! -
	\!\begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix}\! ) \\
	&= \text{span}(
	\!\begin{bmatrix} 2 \\ -2 \\ 0 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix}\! ) \\
	&= \text{span}(
	\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
	\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! )
	\end{split}
	$$
	可以發現子空間 $W$ 恰比子空間 $V$ 多一個向量
	$\!\begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}\!$。<br>
	令子空間 $U = \text{span}\{ ( 0, 0, 0, 1 ) \}$，恰好滿足
	$W = U \oplus V$ 和 $U \perp V$。
</template>
