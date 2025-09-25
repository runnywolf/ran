<template>
	<vk>
		$A$ 的 row sum 均為 1<br>
		$\Rightarrow$ 存在特徵向量 $x_1 = @bm{1; 1}$ 使
		$Ax_1 = @bm{ @f{3;5}, @f{2;5}; @f{2;5}, @f{3;5} } @bm{1; 1} = @bm{1; 1} = 1 x_1$<br>
		$\Rightarrow ~ \lambda_1 = 1$<br>
		<br>
		用 $\text{tr}(A)$ 求 $A$ 的最後一個特徵值：<br>
		$\text{tr}(A) = \lambda_1 + \lambda_2 = \frac{6}{5}$<br>
		$\Rightarrow ~ 1 + \lambda_2 = \frac{6}{5}$<br>
		$\Rightarrow ~ \lambda_2 = \frac{1}{5}$<br>
		<br>
		求特徵向量 $x_2$：
		$$ (A - \lambda_2 I) x_2 = @bm{ @f{2;5} & @f{2;5} \\ @f{2;5} & @f{2;5} } x_2 = 0 $$
		取 $x_2 = @bm{1; -1}$<br>
		<br>
		$A$ 可對角化<br>
		$\Rightarrow ~ A$ 的特徵向量組成的對角化矩陣 $P$ 必可逆<br>
		$\Rightarrow ~ A$ 的特徵向量可形成 $\R^2$ 的一組基底<br>
		$\Rightarrow ~ x = c_1 x_1 + c_2 x_2$<br>
		本題恰好 $x = x_1 + x_2$<br>
		<br>
		根據 $A^n x = \lambda^n x$：
		$$
		\begin{split}
		A^n x &= A^n (x_1 + x_2) \\
		&= A^n x_1 + A^n x_2 \\
		&= \lambda_1^n x_1 + \lambda_2^n x_2 \\
		&= 1^n x_1 + (\tfrac{1}{5})^n x_2
		\end{split}
		$$
		求極限：
		$$
		\begin{split}
		\lim\limits_{n \to \infty} A^n x &= \lim\limits_{n \to \infty} (x_1 + (\tfrac{1}{5})^n x_2) \\
		&= x_1 + \lim\limits_{n \to \infty} (\tfrac{1}{5})^n x_2 \\
		&= x_1 + 0 x_2 \\
		&= x_1 \\
		&= @bm{1; 1} = @bm{a; b}
		\end{split}
		$$
		$2a + b = 3$<br>
		<br>
		Ans: (D)
	</vk>
</template>
