<template>
	<vk>
		參考<RanLink to="https://en.wikipedia.org/wiki/Binomial_series">廣義二項式定理</RanLink>：
		$$ F(x) = \sqrt{1+x} = (1+x)^{1/2} = \binom{1/2}{0} + \binom{1/2}{1} x + \binom{1/2}{2} x^2 + \cdots $$
		，生成函數的前五個係數為：
		$$ \begin{split}
		\binom{1/2}{0} &= 1 \\
		\binom{1/2}{1} &= @f{(1/2); 1!} = @f{1;2} \\
		\binom{1/2}{2} &= @f{(1/2)(-1/2); 2!} = @f{-1;8} \\
		\binom{1/2}{3} &= @f{(1/2)(-1/2)(-3/2); 3!} = @f{1;16} \\
		\binom{1/2}{4} &= @f{(1/2)(-1/2)(-3/2)(-5/2); 4!} = @f{-5;128}
		\end{split} $$
	</vk>
</template>
