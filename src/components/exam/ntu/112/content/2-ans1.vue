<template>
	遞迴關係式為 <vl exp="a_n + a_{n-1} - 6a_{n-2} = 0" />，可知特徵方程式為
	<vl exp="\lambda^2 + \lambda - 6 = 0" />，<br>
	求得特徵根 <vl exp="\lambda = -3, 2" />，一般式為
	<vl exp="a_n = h_1(-3)^n + h_2 2^n" />。<br>
	將 <vl exp="n = 0, 1" /> 代入一般式，並包含初始條件：
	<vl c exp="
		\left\{
		\begin{align*}
			a_0 &= h_1 + h_2      &= A \\
			a_1 &= -3 h_1 + 2 h_2 &= B
		\end{align*}
		\right.
	" />
	解 <vl exp="h_1, h_2" /> 聯立，得到 <vl exp="h_1 = \frac{1}{5} (2A-B)" />,
	<vl exp="h_2 = \frac{1}{5} (3A+B)" /><br>
	將 <vl exp="h_1, h_2" /> 代回一般式：
	<vl c exp="
		\begin{split}
			a_n &= \tfrac{1}{5} (2A-B) (-3)^n + \tfrac{1}{5} (3A+B) 2^n \\
					&= \tfrac{1}{5} [ (-3)^n(2A-B) + 2^n(3A+B) ]
		\end{split}
	" />
	Ans: (A)
</template>
