<template>
	<vk>
		$p(i)$ 為有限體 $F_3$ 內的運算，可以運用費馬小定理化簡 $i^3$：
		$$
		\begin{split}
		p(i) &\equiv i^3 + 2 \\
		&\equiv i^{3 ~\text{mod}~ 2} + 2 \\
		&\equiv i + 2 \pmod{3}
		\end{split}
		$$
		因此
		$$p(x) = 2 + x$$
		得知
		$$(a, b, c) = \boxed{ (2, 1, 0) }$$
	</vk>
</template>
