<template>
	<vk>
		令 $A = Q D Q^T$，則
		$$
		\begin{split}
		@bm{x, y} Q D Q^T @bm{x; y}
		&= @bm{x, y} A @bm{x; y} \\
		&= @bm{x, y} @bm{ a_{11}, a_{12}; a_{21}, a_{22} } @bm{x; y} \\
		&= a_{11} x^2 + (a_{12} + a_{21}) xy + a_{22} y^2 \\
		&= 6x^2 + 24xy - y^2
		\end{split}
		$$
		因為對稱矩陣必可正交對角化，所以必須取 $a_{12} = a_{21} = 12$ 使 $A^T = A$：
		$$A = @bm{ 6, 12; 12, -1 }$$
		對 $A$ 進行正交對角化：<br>
		因為我觀察不出特徵值，只好根據秩和行列式計算特徵值：
		$$
		\begin{cases}
		\text{tr}(A) = \lambda_1 + \lambda_2 = 5 \\
		\det(A) = \lambda_1 \lambda_2 = -150
		\end{cases}
		$$
		可以很容易的發現 $\lambda_1 = 15,~ \lambda_2 = -10$。<br>
		<br>
		求特徵值 $\lambda_1 = 15$ 對應的特徵向量 $x_1$：<br>
		$$ (A - \lambda_1 I)x_1 = @bm{ -9, 12; 12, -16 } x_1 = 0 ~~,~~ \text{choose}~~ x_1 = @bm{ 4; 3 } $$
		求特徵值 $\lambda_2 = -10$ 對應的特徵向量 $x_2$：<br>
		$$ (A - \lambda_2 I)x_2 = @bm{ 16, 12; 12, 9 } x_2 = 0 ~~,~~ \text{choose}~~ x_2 = @bm{ -3; 4 } $$
		對稱矩陣的相異特徵值對應的特徵向量天然正交，因此可以省略正交化。<br>
		由於正交矩陣 $Q$ 必須由單範化的行組成，使 $Q^T Q = I$，所以：
		$$
		\begin{cases}
		q_1 = \dfrac{1}{\| x_1 \|} x_1 = \dfrac{1}{\sqrt{4^2 + 3^2}} x_1 = \dfrac{1}{5} @bm{ 4; 3 } \\
		q_2 = \dfrac{1}{\| x_2 \|} x_2 = \dfrac{1}{\sqrt{(-3)^2 + 4^2}} x_2 = \dfrac{1}{5} @bm{ -3; 4 }
		\rule{0em}{2em}
		\end{cases}
		$$
		$$ Q = [q_1 ~~ q_2] = @bm{ @f{4;5}, @f{-3;5}; @f{3;5}, @f{4;5} } $$
		對角矩陣 $D$ 的對角線為特徵值 ( 必須照順序 )：
		$$ D = @bm{ \lambda_1, 0; 0, \lambda_2 } = @bm{ 15, 0; 0, -10 } $$
		※ 注意：特徵值的順序、特徵向量的取值不同，會影響對角化的結果。
	</vk>
</template>
