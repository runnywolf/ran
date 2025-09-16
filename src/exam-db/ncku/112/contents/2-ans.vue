<template>
	令數列
	$$\{ a_k \} = \{ \underbrace{1, 1, \cdots\!, 1}_{n+1}, 0, 0, \cdots \}$$
	，生成函數為
	$$
	\begin{split}
	\sum\limits_{k=0}^{\infty} a_k x^k
	&= \underbrace{1 + 1x + 1x^2 + \cdots + 1x^n}_{n+1} + 0x^{n+1} + \cdots \\
	&= 1 + x + x^2 + \cdots + x^n \\
	&= \boxed{ \frac{1-x^{n+1}}{1-x} }
	\end{split}
	$$
</template>
