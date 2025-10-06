<template>
	<vk>
		對於整數 $n$，$\sin(n\pi)$ 恆為 $0$，因此遞迴關係式為 $6a_n - 5a_{n-1} + a_{n-2} = 0$<br>
		$\Rightarrow~$ 特徵方程式為 $6\lambda^2 - 5\lambda + 1 = 0$<br>
		$\Rightarrow~$ $\lambda = @f{1;3} ,~ @f{1;2}$<br>
		$\Rightarrow~$ 設一般式為 $a_n = h_1 @(){ @f{1;3} }^n + h_2 @(){ @f{1;2} }^n = h_1 3^{-n} + h_2 2^{-n}$<br>
		<br>
		將 $n = -1 ,~ 0$ 代入一般式，並包含初始條件：
		$$
		\begin{cases}
		a_{-1} = 3 h_1 + 2 h_2 = 0 \\
		a_0 = h_1 + h_2 = 1
		\end{cases}
		$$
		解 $h_1, h_2$ 聯立，得到 $h_1 = -2 ~,~~ h_2 = 3$，並代回一般式：
		$$ \boxed{ a_n = -2 \cdot 3^{-n} + 3 \cdot 2^{-n} } $$
	</vk>
</template>
