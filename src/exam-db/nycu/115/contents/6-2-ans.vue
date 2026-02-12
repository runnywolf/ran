<template>
	<vk>
		$$ \begin{split}
		\sum\limits_{r=2}^{\infty} 2^{x-r} &= 2^{x-2} + 2^{x-3} + \cdots \\
		&= 2^{x-2} @(){ 1 + @f{1;2} + @f{1;4} + \cdots } \\
		&= 2 \cdot 2^{x-2} \\
		&= \sqrt{ 1 + 3 \cdot 2^{x-2} }
		\end{split} $$
		$$ \begin{split}
		&\implies 2a = \sqrt{1+3a} ~,~~ a = 2^{x-2} \gt 0 \\
		&\implies 4a^2 = 1+3a \\
		&\implies 4a^2 - 3a - 1 = 0 \\
		&\implies (4a+1)(a-1) = 0 \\
		&\implies a = @f{-1;4} ,~ 1
		\end{split} $$
		必須 $a \gt 0$，所以 $2^{x-2} = a = 1$，得到 $x = \boxed{2}$。
	</vk>
</template>
