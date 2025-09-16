<template>
	遞迴關係式為 $a_n + a_{n-1} - 6a_{n-2} = 0$<br>
	$\Rightarrow$ 特徵方程式為 $\lambda^2 + \lambda - 6 = 0$<br>
	$\Rightarrow$ 特徵值 $\lambda = -3, 2$<br>
	$\Rightarrow$ 設一般式為 $a_n = h_1(-3)^n + h_2 2^n$<br>
	<br>
	將 $n = 0, 1$ 代入一般式，並包含初始條件：
	$$
	\left\{
	\begin{align*}
	a_0 &= h_1 + h_2      &= A \\
	a_1 &= -3 h_1 + 2 h_2 &= B
	\end{align*}
	\right.
	$$
	解 $h_1, h_2$ 聯立，得到
	$$
	\left\{
	\begin{align*}
	h_1 &= \tfrac{1}{5} (2A-B) \\
	h_2 &= \tfrac{1}{5} (3A+B)
	\end{align*}
	\right.
	$$
	將 $h_1, h_2$ 代回一般式：
	$$
	\begin{split}
	a_n &= \tfrac{1}{5} (2A-B) (-3)^n + \tfrac{1}{5} (3A+B) 2^n \\
	&= \tfrac{1}{5} [ (-3)^n(2A-B) + 2^n(3A+B) ]
	\end{split}
	$$
	Ans: (A)
</template>
