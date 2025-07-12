<template>
	<vl c exp="
		W = \text{span}(S) = \text{span}(
		\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! ,
		\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
		\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! ,
		\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}\! )
	" />
	因為
	<vl exp="
		\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! +
		\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! +
		\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! =
		\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}\!
	" />，因此刪除子空間 <vl exp="W" /> 的多餘向量：
	<vl c exp="
		W = \text{span}(
		\!\begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix}\! ,
		\!\begin{bmatrix} 1 \\ -1 \\ 0 \\ 0 \end{bmatrix}\! ,
		\!\begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix}\! )
	" />
	調整子空間 <vl exp="W" /> 的向量：
	<vl c exp="
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
	" />
	
	<br>
	<vl c exp="
		V = \text{span}(R) = \text{span}(
		\!\begin{bmatrix} 1 \\ -2 \\ 1 \\ 0 \end{bmatrix}\! ,
		\!\begin{bmatrix} -1 \\ 0 \\ 1 \\ 0 \end{bmatrix}\! )
	" />
	調整子空間 <vl exp="V" /> 的向量：
	<vl c exp="
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
	" />
	可以發現子空間 <vl exp="W" /> 恰比子空間 <vl exp="V" /> 多一個向量
	<vl exp="\!\begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}\!" />。<br>
	令子空間 <vl exp="U = \text{span}\{ ( 0, 0, 0, 1 ) \}" />，恰好滿足
	<vl exp="W = U \oplus V" /> 和 <vl exp="U \perp V" />。
</template>
