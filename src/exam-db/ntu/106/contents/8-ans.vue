<template>
	<vk>
		遞迴關係式為 $a_{n+2} = a_{n+1} + a_n$<br>
		$\Rightarrow$ 特徵方程式為 $\lambda^2 = \lambda + 1$<br>
		$\Rightarrow$ 特徵值 $\lambda = @cf{1-\sqrt{5}; 2} ~,~~ @cf{1+\sqrt{5}; 2}$<br>
		$\Rightarrow$ 設一般式為 $a_n = h_1 @(){ @cf{1-\sqrt{5}; 2} }^n + h_2 @(){ @cf{1+\sqrt{5}; 2} }^n$<br>
		<br>
		將 $n = 0, 1$ 代入一般式，並包含初始條件：
		$$
		\begin{cases}
		a_0 = h_1 + h_2 \\
		a_1 = @(){ @cf{ 1 - \sqrt{5}; 2 } } h_1 + @(){ @cf{ 1 + \sqrt{5}; 2 } } h_2
		\end{cases}
		$$
		解 $h_1, h_2$ 聯立，得到
		$$
		\begin{cases}
		h_1 = @cf{ (\sqrt{5} + 1) a_0 - 2 a_1; 2 \sqrt{5} } \\
		h_2 = @cf{ (\sqrt{5} - 1) a_0 + 2 a_1; 2 \sqrt{5} } \rule{0em}{2.2em}
		\end{cases}
		$$
		將 $h_1, h_2$ 代回一般式：
		$$
		\begin{split}
		a_n &= @(){ @f{ (\sqrt{5} + 1) a_0 - 2 a_1; 2 \sqrt{5} } } @(){ @cf{ 1 - \sqrt{5}; 2 } }^n +
		@(){ @f{ (\sqrt{5} - 1) a_0 + 2 a_1; 2 \sqrt{5} } } @(){ @cf{ 1 + \sqrt{5}; 2 } }^n \\
		&= @(){ @f{ A; 2 \sqrt{5} } } @(){ @f{B; 2} }^n + @(){ @f{ C; 2 \sqrt{5} } } @(){ @f{D; 2} }^n
		\end{split}
		$$
	</vk>
</template>
