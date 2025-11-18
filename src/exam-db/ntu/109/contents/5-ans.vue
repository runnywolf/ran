<template>
	<vk>
		注意：
		$$ \sum\limits_{n=0}^{\infty} (kx)^n = @f{1; 1-kx} $$
		$$ @f{d;dx} @(){ \sum\limits_{n=0}^{\infty} (kx)^n } = @f{d;dx} @(){ @f{1; 1-kx} }
		~~\implies~~ k \sum\limits_{n=1}^{\infty} n(kx)^{n-1} = @f{k; (1-kx)^2} $$
		$$ \sum\limits_{n=0}^{\infty} n(kx)^n = \sum\limits_{n=1}^{\infty} n(kx)^n
		= kx \sum\limits_{n=1}^{\infty} n(kx)^{n-1} = @f{kx; (1-kx)^2} $$
		可以根據<RanLink to="#/exam/ntu-109/4" newTab>上一題</RanLink>的一般項，繼續推導出生成函數的部分分式分解：
		$$
		\begin{split}
		G(x) &= \sum\limits_{n=0}^{\infty} a_n x^n \\
		&= \sum\limits_{n=0}^{\infty} \left( \frac{-3}{4} + \frac{-1}{2} n + \frac{7}{4} \cdot 3^n \right) x^n \\
		&= \frac{-3}{4} \sum\limits_{n=0}^{\infty} x^n + \frac{-1}{2} \sum\limits_{n=0}^{\infty} nx^n +
		\frac{7}{4} \sum\limits_{n=0}^{\infty} (3x)^n \\
		&= \frac{-3}{4} \cdot \frac{1}{1-x} + \frac{-1}{2} \cdot \frac{x}{(1-x)^2} + \frac{7}{4} \cdot \frac{1}{1-3x}
		\end{split}
		$$
		$\frac{x}{(1-x)^2}$ 的分子並非常數，不合法，但是可以像這樣提出去：
		$$\frac{x}{(1-x)^2} = \frac{-(1-x)+1}{(1-x)^2} = \frac{-1}{1-x} + \frac{1}{(1-x)^2}$$
		因此生成函數可以化簡成
		$$
		\begin{split}
		&= \frac{-3}{4} \cdot \frac{1}{1-x} + \frac{-1}{2} \left( \frac{-1}{1-x} + \frac{1}{(1-x)^2} \right) +
		\frac{7}{4} \cdot \frac{1}{1-3x} \\
		&= \boxed{ \frac{-1}{4} \cdot \frac{1}{1-x} + \frac{-1}{2} \cdot \frac{1}{(1-x)^2} + \frac{7}{4} \cdot \frac{1}{1-3x} }
		\end{split}
		$$
	</vk>
</template>
