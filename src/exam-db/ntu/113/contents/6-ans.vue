<template>
	<vl exp="
		Ax \in \text{Col}(A) = \text{span}(
		\!\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\! ,
		\!\begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\! ,
		\!\begin{bmatrix} -1 \\ 2 \\ -3 \end{bmatrix}\!
		)
		= \text{span}(
		\!\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\! ,
		\!\begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\!
		)
	" /><br>
	<div style="height: 8px"></div>
	※ 因為
	<vl exp="
		-1 \!\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\! +
		2 \!\begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\! =
		\!\begin{bmatrix} -1 \\ 2 \\ -3 \end{bmatrix}\!
	" /><br>
	<br>
	若將向量 <vl exp="b" /> 投影到向量空間 <vl exp="\text{Col}(A)" />，得到向量
	<vl exp="Ax' \in \text{Col}(A)" />，會使 <vl exp="\| Ax'-b \|" /> 達到最小值：
	<vl c exp="
		\begin{split}
		Ax' &= \text{proj}_{\text{Col}(A)}(b) \\
		&= A (A^T A)^{-1} A^T b \\
		&= A {\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix}}^{-1}
		\!\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \end{bmatrix}\!
		\!\begin{bmatrix} 1 \\ 0 \\ 2 \end{bmatrix} \\
		&= A (\frac{1}{3} \!\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix})
		\!\begin{bmatrix} 3 \\ -2 \end{bmatrix} \\
		&= \frac{1}{3} \!\begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 1 & -1 \end{bmatrix}\!
		\!\begin{bmatrix} 4 \\ -1 \end{bmatrix} \\
		&= \frac{1}{3} \!\begin{bmatrix} 4 \\ -1 \\ 5 \end{bmatrix}
		\end{split}
	" />
	因此範數平方的最小值為：
	<vl c exp="
		\begin{split}
		\| Ax'-b \|^2 &= \| \frac{1}{3} \!\begin{bmatrix} 4 \\ -1 \\ 5 \end{bmatrix}\!
		- \!\begin{bmatrix} 1 \\ 0 \\ 2 \end{bmatrix}\! \|^2 \\
		&= \| \!\def\arraystretch{1.35}\begin{bmatrix}
		\frac{1}{3} \\ \frac{-1}{3} \\ \frac{-1}{3} \end{bmatrix}\! \|^2 \\
		&= (\frac{1}{3})^2 + (\frac{-1}{3})^2 + (\frac{-1}{3})^2 \\
		&= \boxed{ \frac{1}{3} }
		\end{split}
	" />
</template>
