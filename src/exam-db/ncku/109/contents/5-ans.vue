<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b', 'c' ]">
			<template #a>
				先對第一行展開，再對係數為 $(-1)x$ 的行列式的第一列展開：
				$$
				\begin{split}
				D_n &= @vm{
				\textcolor{blue}{y}, x, , , , ;
				\textcolor{#090}{x}, y, x, , , ;
				, x, y, x, , ;
				, , x, \ddots, \ddots, \rule{0em}{1.2em};
				, , , \ddots, y, x;
				, , , , x, y;
				}_{n \times n} \\
				&= \textcolor{blue}{y} @vm{
				y, x, , , ;
				x, y, x, , ;
				, x, \ddots, \ddots, \rule{0em}{1.2em};
				, , \ddots, y, x;
				, , , x, y;
				}_{(n-1) \times (n-1)} + \\
				&\quad\,\, \textcolor{#090}{(-1)x} @vm{
				\textcolor{#a0a}{x}, , , , ;
				x, y, x, , ;
				, x, \ddots, \ddots, \rule{0em}{1.2em};
				, , \ddots, y, x;
				, , , x, y;
				}_{(n-1) \times (n-1)} \\
				&= y D_{n-1} + (-1) x \cdot \textcolor{#a0a}{x} D_{n-2} \\
				&= y D_{n-1} - x^2 D_{n-2}
				\end{split}
				$$
				初始條件
				$$ D_1 = |[y]| = y \quad;\quad D_2 = @vm{y, x; x, y} = y^2 - x^2 $$
				，得到遞迴關係式：
				$$
				\boxed{
				\begin{gather*}
				D_n = y D_{n-1} - x^2 D_{n-2} ~,~~ n \ge 2 \\
				D_1 = y ~,~~ D_2 = y^2 - x^2
				\end{gather*}
				}
				$$
			</template>
			<template #b>
				當 $y = x$ 時，
				$$
				\begin{gather*}
				D_n = x D_{n-1} - x^2 D_{n-2} \\
				D_1 = x ~,~~ D_2 = 0
				\end{gather*}
				$$
				特徵方程式為 $\lambda^2 = x \lambda - x^2$，特徵值 $\lambda = @cf{1\pm\sqrt{3}i; 2} \, x$，設一般式為
				$$
				\begin{split}
				D_n &= h_1 @(){ @f{1+\sqrt{3}i; 2} x }^n + h_2 @(){ @f{1-\sqrt{3}i; 2} x }^n \\
				&= @(){ h_1 @(){ @f{1+\sqrt{3}i; 2} }^n + h_2 @(){ @f{1-\sqrt{3}i; 2} }^n } x^n
				\end{split}
				$$
				將共軛複數用極座標表示：
				$$
				\begin{split}
				&\quad\,\, h_1 {(\alpha + \beta i)}^n + h_2 {(\alpha - \beta i)}^n ~,\quad
				\alpha = @f{1;2} ~,\quad \beta = @f{\sqrt{3};2} \\
				&= h_1 {(r e^{i \theta})}^n + h_2 {(r e^{-i \theta})}^n ~,\quad
				r = \sqrt{\alpha^2 + \beta^2} ~,\quad \theta = \text{atan2}(\beta , \alpha) \\
				&= ( h_1 e^{i n \theta} + h_2 e^{-i n \theta} ) r^n \\
				&= \Big( h_1 (\cos n \theta + i \sin n \theta) + h_2 (\cos n \theta - i \sin n \theta) \Big) r^n \\
				&= \Big( (h_1 + h_2) \cos(n \theta) + (h_1 - h_2) i \sin(n \theta) \Big) r^n
				\end{split}
				$$
				因此，可以將一般式轉為：
				$$
				\begin{split}
				D_n &= \Big( (h_1 + h_2) \cos(n \theta) + (h_1 - h_2) i \sin(n \theta) \Big) r^n x^n
				~,\quad r = 1 ~,\quad \theta = @f{\pi;3} \\
				&= @(){ (h_1 + h_2) \cos@(){ @f{n\pi;3} } + (h_1 - h_2) i \sin@(){ @f{n\pi;3} } } x^n
				\end{split}
				$$
				因為 $(h_1 + h_2)$ 和 $(h_1 - h_2) i$ 都是實數，可以設新的未知數 $k_1 ,~ k_2$：
				$$ D_n = @(){ k_1 \cos@(){ @f{n\pi;3} } + k_2 \sin@(){ @f{n\pi;3} } } x^n $$
				將 $n = 1, 2$ 代入一般式，並包含初始條件：
				$$
				\left\{
				\begin{split}
				D_1 &= @(){ @f{\sqrt{3}; 2} k_1 + @f{1;2} k_2 } x = x \\
				D_2 &= @(){ @f{1;2} k_1 + @f{\sqrt{3}; 2} k_2 } x^2 = 0
				\end{split}
				\right.
				$$
				常數 $x \in \mathbb{R}^+$，可以將 $x$ 消去，並將等式兩側同乘 $2$：
				$$
				\begin{cases}
				\sqrt{3} k_1 + k_2 = 1 \\
				k_1 + \sqrt{3} k_2 = 0
				\end{cases}
				$$
				解 $k_1,~ k_2$ 聯立，得到 $k_1 = @cf{\sqrt{3}; 2} ~,~~ k_2 = @cf{-1;2}$，並代回一般式：
				$$
				\begin{split}
				D_n &= @(){ @cf{\sqrt{3}; 2} \cos@(){ @f{n\pi;3} } + @cf{-1;2} \sin@(){ @f{n\pi;3} } } x^n \\
				&= \boxed{ @f{x^n; 2} @(){ \sqrt{3} \cos@(){ @f{n\pi;3} } - \sin@(){ @f{n\pi;3} } } }
				\end{split}
				$$
			</template>
			<template #c>
				當 $y = 2x$ 時，
				$$
				\begin{gather*}
				D_n = 2x D_{n-1} - x^2 D_{n-2} \\
				D_1 = 2x ~,~~ D_2 = 3x^2
				\end{gather*}
				$$
				特徵方程式為 $\lambda^2 = 2x \lambda - x^2$，特徵值 $\lambda = x ,~ x$，<br>
				有二重根 $x$，需要設一般式為 $D_n = h_1 x^n + h_2 n x^n$ 保證線性獨立。<br>
				<br>
				將 $n = 1, 2$ 代入一般式，並包含初始條件：
				$$
				\left\{
				\begin{split}
				D_1 &= h_1 x + h_2 x = 2x \\
				D_2 &= h_1 x^2 + 2 h_2 x^2 = 3x^2
				\end{split}
				\right.
				$$
				常數 $x \in \mathbb{R}^+$，可以將 $x$ 消去：
				$$
				\begin{cases}
				h_1 + h_2 = 2 \\
				h_1 + 2 h_2 = 3
				\end{cases}
				$$
				解 $h_1,~ h_2$ 聯立，得到 $h_1 = h_2 = 1$，並代回一般式：
				$$ \begin{split} D_n &= x^n + n x^n \\ &= \boxed{ x^n (1+n) } \end{split} $$
			</template>
		</MultiOption>
	</vk>
</template>
