<template>
	<vk>
		遞迴關係式為 $a_{n+2} = a_{n+1} + 2a_n$<br>
		$\Rightarrow$ 特徵方程式為 $\lambda^2 = \lambda + 2$<br>
		$\Rightarrow$ 特徵值 $\lambda = 2,~ -1$<br>
		$\Rightarrow$ 設一般式為 $a_n = h_1 2^n + h_2 (-1)^n$<br>
		<br>
		將 $n = 0, 1$ 代入一般式：
		$$
		\begin{cases}
		a_0 = h_1 + h_2 \\
		a_1 = 2 h_1 - h_2
		\end{cases}
		$$
		解 $h_1, h_2$ 聯立，得到
		$$
		\begin{cases}
		h_1 = @f{1;3} a_0 + @f{1;3} a_1 \\
		h_2 = @f{2;3} a_0 + @f{-1;3} a_1
		\end{cases}
		$$
		將 $h_1, h_2$ 代回一般式：
		$$
		\begin{split}
		a_n &= @(){ @f{1;3} a_0 + @f{1;3} a_1 } 2^n + @(){ @f{2;3} a_0 + @f{-1;3} a_1} (-1)^n \\
		&= BY^n + A(-X)^n
		\end{split}
		$$
	</vk>
</template>
