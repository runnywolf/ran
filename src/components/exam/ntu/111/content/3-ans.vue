<template>
	遞迴關係式為 <vl exp="a_n + a_{n-1} - 6a_{n-2} = 0" /><br>
	<vl exp="\Rightarrow" /> 特徵方程式為 <vl exp="\lambda^2 + \lambda - 6 = 0" /><br>
	<vl exp="\Rightarrow" /> 特徵值 <vl exp="\lambda = -3, 2" /><br>
	<vl exp="\Rightarrow" /> 設一般式為 <vl exp="a_n = h_1(-3)^n + h_2 2^n" /><br>
	<br>
	求生成函數 <vl exp="G(x)" /> 的部分分式分解，注意
	<vl exp="\sum\limits_{n=0}^{\infty} (kx)^n = \frac{1}{1-kx}" />：
	<vl c exp="
		\begin{split}
		G(x) &= \sum_{n=0}^{\infty} a_n x^n \\
		&= \sum_{n=0}^{\infty} [h_1(-3)^n + h_2 2^n] x^n \\
		&= h_1 \sum_{n=0}^{\infty} (-3)^n x^n + h_2 \sum_{n=0}^{\infty} 2^n x^n \\
		&= h_1 \sum_{n=0}^{\infty} (-3x)^n + h_2 \sum_{n=0}^{\infty} (2x)^n \\
		&= h_1 \frac{1}{1-(-3x)} + h_2 \frac{1}{1-2x} \\
		&= \frac{h_1}{1+3x} + \frac{h_2}{1-2x}
		\end{split}
	" />
	觀察每個選項的特徵值 (分母) <vl exp="\Rightarrow" /> (D) (E) 可能正確<br>
	<br>
	由於
	<vl c exp="G(0) = a_0 + a_1 0^1 + a_2 0^2 + \cdots = a_0 = A" />
	，所以將 <vl exp="x = 0" /> 代入到選項 (D) (E)，求各選項的 <vl exp="G(0)" />：<br>
	(D) <vl exp="A - \frac{2}{5}B" />
	(E) <vl exp="A" /><br>
	<vl exp="\Rightarrow" /> (E) 正確<br>
	<br>
	Ans: (E)
</template>
