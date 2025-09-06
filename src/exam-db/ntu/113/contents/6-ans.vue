<template>
	<vk>
		若將向量 $b$ 投影到向量空間 $\text{Col}(A)$，得到向量 $Ax' \in \text{Col}(A)$，會使 $\| Ax'-b \|$ 達到最小值。<br>
		注意到矩陣 $A$ 的行向量有以下關係：
		$$
		-1 \!\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\! +
		2 \!\begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\! =
		\!\begin{bmatrix} -1 \\ 2 \\ -3 \end{bmatrix}\!
		$$
		$A$ 的行向量並沒有線性獨立，$A^T A$ 不可逆，因此無法使用投影公式
		$$Ax' = \text{proj}_{\text{Col}(A)}(b) = A (A^T A)^{-1} A^T b$$
		。但是根據剛才發現的關係，即使刪除第 3 行，仍然能生成 $\text{Col}(A)$：
		$$
		\text{Col}(A) = \text{span}(
		\!\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\! ,
		\!\begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\! ,
		\!\begin{bmatrix} -1 \\ 2 \\ -3 \end{bmatrix}\!
		)
		= \text{span}(
		\!\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\! ,
		\!\begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\!
		)
		$$
		所以
		$$
		[A|b] = \!\left( \begin{array}{cc|c}
		1 & 0 & 1 \\
		0 & 1 & 0 \\
		1 & -1 & 2
		\end{array} \right)
		$$
		仍然能正確計算 $Ax'$。<br>
		請注意：這個方法計算出的 $x'$ 的維度被縮減，因此與偽逆得到的 $x' = A^+ b$ 不一樣，但兩者求 $Ax'$ 是相同的。<br>
		<br>
		先求 $Ax'$：
		$$
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
		$$
		因此範數平方的最小值為：
		$$
		\begin{split}
		\| Ax'-b \|^2 &= \| \frac{1}{3} \!\begin{bmatrix} 4 \\ -1 \\ 5 \end{bmatrix}\!
		- \!\begin{bmatrix} 1 \\ 0 \\ 2 \end{bmatrix}\! \|^2 \\
		&= \| \!\def\arraystretch{1.35}\begin{bmatrix}
		\frac{1}{3} \\ \frac{-1}{3} \\ \frac{-1}{3} \end{bmatrix}\! \|^2 \\
		&= (\frac{1}{3})^2 + (\frac{-1}{3})^2 + (\frac{-1}{3})^2 \\
		&= \boxed{ \frac{1}{3} }
		\end{split}
		$$
	</vk>
</template>
