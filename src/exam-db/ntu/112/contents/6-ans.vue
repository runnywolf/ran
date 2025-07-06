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
	<vl exp="A" /> 可對角化<br>
	<vl exp="\Rightarrow ~ A" /> 的特徵向量組成的對角化矩陣 <vl exp="P" /> 必可逆<br>
	<vl exp="\Rightarrow ~ A" /> 的特徵向量可形成 <vl exp="\R^2" /> 的一組基底<br>
	<vl exp="\Rightarrow ~ x = c_1 x_1 + c_2 x_2" /><br>
	本題恰好 <vl exp="x = x_1 + x_2" /><br>
	<br>
	根據 <vl exp="A^n x = \lambda^n x" />：
	<vl c exp="
		\begin{split}
		A^n x &= A^n (x_1 + x_2) \\
		&= A^n x_1 + A^n x_2 \\
		&= \lambda_1^n x_1 + \lambda_2^n x_2 \\
		&= 1^n x_1 + (\tfrac{1}{5})^n x_2
		\end{split}
	" />
	求極限：
	<vl c exp="
		\begin{split}
		\lim\limits_{n \to \infty} A^n x &= \lim\limits_{n \to \infty} (x_1 + (\tfrac{1}{5})^n x_2) \\
		&= x_1 + \lim\limits_{n \to \infty} (\tfrac{1}{5})^n x_2 \\
		&= x_1 + 0 x_2 \\
		&= x_1 \\
		&= \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}\! = \!\begin{bmatrix} a \\ b \end{bmatrix}\!
		\end{split}
	" />
	<vl exp="2a + b = 3" /><br>
	<br>
	Ans: (D)
</template>
