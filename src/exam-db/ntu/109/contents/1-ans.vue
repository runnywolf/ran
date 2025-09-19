<template>
	<vk>
		$a \le x_i \le b$，生成函數為 $x^a + x^{a+1} + \cdots + x^b$；有 n 項 $x_i$ 相加則需要 n 次方，<br>
		因此生成函數為
		$$(x^a + x^{a+1} + \cdots + x^b)^n$$
		，嘗試化簡：
		$$
		\begin{split}
		&\quad~ (x^a + x^{a+1} + \cdots + x^b)^n \\
		&= (1 + x + x^2 + \cdots + x^{b-a})^n x^a \\
		&= \left( \frac{1 - x^{b-a+1}}{1 - x} \right)^n x^a \\
		&= \boxed{ (1 - x^{b-a+1})^n (1 - x)^{-n} x^a }
		\end{split}
		$$
		寫出任意一個封閉形式的生成函數應該都算對。
	</vk>
</template>
