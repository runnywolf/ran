<template>
	<vk>
		注意到
		$$
		\begin{split}
		&\quad~~ 2 \left[ \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{\frac{n-1}{2}} \right] \\
		&= \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{\frac{n-1}{2}} +
		\binom{n}{\frac{n-1}{2}} + \cdots + \binom{n}{1} + \binom{n}{0} \\
		&= \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{\frac{n-1}{2}} +
		\binom{n}{\frac{n+1}{2}} + \cdots + \binom{n}{n-1} + \binom{n}{n} \\
		&= 2^n
		\end{split}
		$$
		所以
		$$ \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{\frac{n-1}{2}} = \tfrac{1}{2} 2^n = \boxed{ 2^{n-1} } $$
	</vk>
</template>
