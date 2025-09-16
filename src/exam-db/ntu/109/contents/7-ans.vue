<template>
	$$
	\left\{
	\begin{split}
	f(-2) &= 16a - 8b + 4c - 2d + e \\
	f(-1) &= a - b + c - d + e \\
	f(0) &= e = 2 \\
	f(1) &= a + b + c + d + e \\
	f(2) &= 16a + 8b + 4c + 2d + e
	\end{split}
	\right.
	$$
	先解 $b, d$ 的聯立：
	$$ \begin{cases} f(-1) - f(1) = -2b - 2d = -2 \\ f(-2) - f(2) = -16b - 4d = -16 \end{cases} $$
	明顯 $b = 1 ,~ d = 0$，然後再解 $a, c$ 的聯立：
	$$ \begin{cases} f(1) = a + 1 + c + 0 + 2 = 18 \\ f(2) = 16a + 8 + 4c + 0 + 2 = 166 \end{cases} $$
	$$ \implies \begin{cases} a + c = 15 \\ 16a + 4c = 156 \end{cases} $$
	得到 $a = 8 ,~ c = 7$，所以 $a, b, c, d, e$ 分別為
	$$\boxed{ 8, 1, 7, 0, 2 }$$
</template>
