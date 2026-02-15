<template>
	<vk>
		$\text{for } i \ge 0 ,~ 10^i \equiv 1 \pmod{3}$，所以
		$$ n \equiv \sum\limits_{i=0}^k a_i 10^i \equiv \sum\limits_{i=0}^k a_i \pmod{3} $$
		，可知 $n$ 的各位數總和能被 3 整除 $\Leftrightarrow n$ 能被 3 整除。<br>
		<br>
		注意到
		$$ \begin{split}
		T &= \underbrace{11 \cdots 11}_{243} \\
		&= \underbrace{11 \cdots 11}_{81} \times 1\underbrace{0 \cdots 01}_{81}\underbrace{0 \cdots 01}_{81} \\
		&= \underbrace{11 \cdots 11}_{81} \times 3x ~,~~ x \in \mathbb{Z}^+
		\end{split} $$
		，以此類推，令 $x_i$ 為未知正整數：
		$$ \begin{split}
		T &= \underbrace{11 \cdots 11}_{243} \\
		&= \underbrace{11 \cdots 11}_{81} \times 3 x_1 \\
		&= \underbrace{11 \cdots 11}_{27} \times 9 x_1 x_2 \\
		&= \underbrace{11 \cdots 11}_{9} \times 27 x_1 x_2 x_3 \\
		&= \underbrace{111}_{3} \times 81 x_1 x_2 x_3 x_4 \\
		&= 37 \times 243 x_1 x_2 x_3 x_4 \\
		&= 243(37 x_1 x_2 x_3 x_4)
		\end{split} $$
		，因此 $T$ 可以被 $243$ 整除。
	</vk>
</template>
