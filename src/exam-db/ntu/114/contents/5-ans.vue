<template>
	<vk>
	可以根據<RanLink to="#/exam/ntu-114/4" newTab>上一題</RanLink>
	<span>的一般項，繼續推導出生成函數的部分分式分解，其中</span>
	$\sum\limits_{n=0}^{\infty} (kx)^n = \frac{1}{1-kx}$：<br>
	$$
	\begin{split}
	G(x) &= \sum\limits_{n=0}^{\infty} a_n x^n \\
	&= \sum\limits_{n=0}^{\infty} \left( \frac{17}{7} 2^n + \frac{4}{7} (-5)^n \right) x^n \\
	&= \frac{17}{7} \sum\limits_{n=0}^{\infty} (2x)^n + \frac{4}{7} \sum\limits_{n=0}^{\infty} (-5x)^n \\
	&= \boxed{ \frac{17}{7} \cdot \frac{1}{1-2x} + \frac{4}{7} \cdot \frac{1}{1+5x} }
	\end{split}
	$$
	</vk>
</template>
