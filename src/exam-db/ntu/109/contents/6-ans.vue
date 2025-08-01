<template>
	<vk>
		二項式係數 $\binom{n}{m}$ 具有對稱性：$\binom{n}{m} = \binom{n}{n-m}$，因此最大值會出現在
		$\binom{n}{\lfloor n/2 \rfloor}$ 和 $\binom{n}{\lceil n/2 \rceil}$，所以
		$$\forall k \in \{0, 1, \cdots\!, n\} ,~ \binom{n}{k} \le \binom{n}{\lfloor n/2 \rfloor}$$
		。根據上式，當 $2 \le n$ 時，
		$$2 \le n = \binom{n}{1} \le \binom{n}{\lfloor n/2 \rfloor}$$
		。注意到
		$$
		\begin{split}
		2^n &= \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{n-1} + \binom{n}{n} \\
		&= 2 + \binom{n}{1} + \cdots + \binom{n}{n-1} \\
		&\le \binom{n}{\lfloor n/2 \rfloor} +
		\underbrace{ \binom{n}{\lfloor n/2 \rfloor} + \cdots + \binom{n}{\lfloor n/2 \rfloor} }_{n-1} \\
		&= n \binom{n}{\lfloor n/2 \rfloor}
		\end{split}
		$$
		$$\implies ~ \frac{2^n}{n} \le \binom{n}{\lfloor n/2 \rfloor} ~,~~ 2 \le n$$
		得證。
	</vk>
</template>
