<template>
	<vl exp="A" /> 的 row sum 均為 1<br>
	<vl exp="\Rightarrow" /> 存在特徵向量 <vl exp="x_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}\!" />
	使
	<vl exp="
		Ax_1 = \!\def\arraystretch{1.35}\begin{bmatrix} \frac{3}{5} & \frac{2}{5} \\ \frac{2}{5} & \frac{3}{5} \end{bmatrix}\!
		\!\def\arraystretch{1}\begin{bmatrix} 1 \\ 1 \end{bmatrix}\!
		= \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}\! = 1 x_1
	" />
	<br>
	<vl exp="\Rightarrow ~ \lambda_1 = 1" /><br>
	<br>
	用 <vl exp="\text{tr}(A)" /> 求 <vl exp="A" /> 的最後一個特徵值：<br>
	<vl exp="\text{tr}(A) = \lambda_1 + \lambda_2 = \frac{6}{5}" /><br>
	<vl exp="\Rightarrow ~ 1 + \lambda_2 = \frac{6}{5}" /><br>
	<vl exp="\Rightarrow ~ \lambda_2 = \frac{1}{5}" /><br>
	<br>
	求特徵向量 <vl exp="x_2" />：
	<vl c exp="
		(A - \lambda_2 I) x_2
		= \!\def\arraystretch{1.35}\begin{bmatrix} \frac{2}{5} & \frac{2}{5} \\ \frac{2}{5} & \frac{2}{5} \end{bmatrix}\! x_2
		= 0
	" />
	取 <vl exp="x_2 = \!\begin{bmatrix} 1 \\ -1 \end{bmatrix}\!" /><br>
	<br>
	將 <vl exp="A" /> 對角化：
	<vl c exp="
		\begin{split}
			A &= P D P^{-1} = \!\begin{bmatrix} x_1 & x_2 \end{bmatrix}\!
					 \!\def\arraystretch{1.35}\begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{bmatrix}\!
					 \!\def\arraystretch{1}\begin{bmatrix} x_1 & x_2 \end{bmatrix}^{-1} \\
				&= \!\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\!
				   \!\begin{bmatrix} 1 & 0 \\ 0 & \frac{1}{5} \end{bmatrix}\!
					 \!\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}^{-1}
		\end{split}
	" />
	再求極限
	<vl c exp="
		\begin{split}
			\lim\limits_{n \to \infty} A^n x &= \lim\limits_{n \to \infty} (P D P^{-1})^n x \\
				&= \lim\limits_{n \to \infty} P D^n P^{-1} x \\
				&= \lim\limits_{n \to \infty} P \!\begin{bmatrix} 1^n & 0 \\ 0 & (\frac{1}{5})^n \end{bmatrix}\! P^{-1} x \\
				&= P \!\def\arraystretch{1.35}\begin{bmatrix} 1 & 0 \\ 0 & \lim\limits_{n \to \infty} (\frac{1}{5})^n \end{bmatrix}\! P^{-1} x \\
				&= P \!\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}\! P^{-1} x \\
				&= \!\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\!
				   \!\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}\!
					 \left(\frac{1}{2} \!\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\! \right)
					 \!\begin{bmatrix} 2 \\ 0 \end{bmatrix}\! \\
				&= \!\begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix}\!
				   \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}\! \\
				&= \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}\! = \!\begin{bmatrix} a \\ b \end{bmatrix}\!
		\end{split}
	" />
	<vl exp="2a+b = 3" /><br>
	<br>
	Ans: (D)
</template>
