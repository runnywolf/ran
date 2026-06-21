<template>
	<vk>
		令 $f(x) = \sqrt{x}$，在 $x \gt 0$ 時 $f$ 為凹函數。<br>
		對於凹函數，參考 Jensen's Inequality 可以發現
		$$@f{1;b-a} \int_a^b f(x) dx \le f@(){ @f{a+b;2} }$$
		。令 $a = k-@f{1;2} ~,~~ b = k+@f{1;2}$，則
		$$\int_{k-1/2}^{k+1/2} f(x) dx \le f(k)$$
		$$\implies~ \int_{k-1/2}^{k+1/2} \sqrt{x} dx \le \sqrt{k}$$
		$$ \implies~ \sum\limits_{k=5}^{13} \int_{k-1/2}^{k+1/2} \sqrt{x} dx
		= \int_{5-1/2}^{13+1/2} \sqrt{x} dx \le \sum\limits_{k=5}^{13} \sqrt{k} $$
		。計算左側定積分 (使用直式開根取到兩位精度)：
		$$ \begin{split}
		\int_{5-1/2}^{13+1/2} \sqrt{x} dx &= \int_{9/2}^{27/2} x^{1/2} dx \\
		&= \left[ @f{2;3} x^{3/2} \right]_{9/2}^{27/2} \\
		&= @f{2;3} @(){ @f{27;2} \sqrt{@f{27;2}} - @f{9;2} \sqrt{@f{9;2}} } \\
		&= 9 \sqrt{@f{27;2}} - 3 \sqrt{@f{9;2}} \\
		&= \sqrt{1093.5} - \sqrt{40.5} \\
		&\gt 33 - 6.4 = 26.6
		\end{split} $$
		$$ \implies~ 26.6 \lt \int_{5-1/2}^{13+1/2} \sqrt{x} dx \le \sqrt{5} + \sqrt{6} + \cdots + \sqrt{13} $$
		<br>
		根據算幾不等式可以推導出：
		$$ \begin{split}
		&\qquad~~~ \sqrt{ab} \lt @f{a+b;2} ~~ \text{ for } a, b \gt 0 ,~ a \neq b \\
		&\implies 2\sqrt{ab} \lt a+b \\
		&\implies \sqrt{a}^2 + 2\sqrt{ab} + \sqrt{b}^2 \lt 2(a+b) \\
		&\implies (\sqrt{a} + \sqrt{b})^2 \lt 2(a+b) \\
		&\implies \sqrt{a} + \sqrt{b} \lt \sqrt{2(a+b)}
		\end{split} $$
		因此
		$$ \begin{split}
		26.6 &\lt \sqrt{5} + \sqrt{6} + \cdots + \sqrt{13} \\
		&= (\sqrt{5} + \sqrt{13}) + (\sqrt{6} + \sqrt{12}) + (\sqrt{7} + \sqrt{11}) + (\sqrt{8} + \sqrt{10}) + \sqrt{9} \\
		&\lt 4\sqrt{36} + \sqrt{9} \\
		&= 27
		\end{split} $$
		所以 $\sqrt{5} + \sqrt{6} + \cdots + \sqrt{13}$ 的整數部分只能是 $26$。<br>
	</vk>
</template>
