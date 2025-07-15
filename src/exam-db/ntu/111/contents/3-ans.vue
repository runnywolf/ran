<template>
	<vk>
		遞迴關係式為 $a_n + a_{n-1} - 6a_{n-2} = 0$<br>
		$\Rightarrow$ 特徵方程式為 $\lambda^2 + \lambda - 6 = 0$<br>
		$\Rightarrow$ 特徵值 $\lambda = -3, 2$<br>
		$\Rightarrow$ 設一般式為 $a_n = h_1(-3)^n + h_2 2^n$<br>
		<br>
		求生成函數 $G(x)$ 的部分分式分解，注意 $\sum\limits_{n=0}^{\infty} (kx)^n = \frac{1}{1-kx}$：
		$$
		\begin{split}
		G(x) &= \sum_{n=0}^{\infty} a_n x^n \\
		&= \sum_{n=0}^{\infty} [h_1(-3)^n + h_2 2^n] x^n \\
		&= h_1 \sum_{n=0}^{\infty} (-3)^n x^n + h_2 \sum_{n=0}^{\infty} 2^n x^n \\
		&= h_1 \sum_{n=0}^{\infty} (-3x)^n + h_2 \sum_{n=0}^{\infty} (2x)^n \\
		&= h_1 \frac{1}{1-(-3x)} + h_2 \frac{1}{1-2x} \\
		&= \frac{h_1}{1+3x} + \frac{h_2}{1-2x}
		\end{split}
		$$
		觀察每個選項的特徵值 (分母) $\Rightarrow$ (D) (E) 可能正確<br>
		<br>
		由於
		$$G(0) = a_0 + a_1 0^1 + a_2 0^2 + \cdots = a_0 = A$$
		，所以將 $x = 0$ 代入到選項 (D) (E)，求各選項的 $G(0)$：<br>
		(D) $A - \frac{2}{5}B$ (E) $A$<br>
		$\Rightarrow$ (E) 正確<br>
		<br>
		Ans: (E)
	</vk>
</template>
