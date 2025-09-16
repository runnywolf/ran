<template>
	在 $t = 1$ 處對 $x = f(t) = 5t^3 - 4t^2 + 3t - 2$ 作泰勒展開：
	$$
	\begin{split}
	x = f(t) &= \frac{f(1)}{0!} \cdot 1 + \frac{f'(1)}{1!} (x-1) +
	\frac{f''(1)}{2!} (x-1)^2 + \frac{f'''(1)}{3!} (x-1)^3 \\
	&= \frac{2}{1} \cdot 1 + \frac{10}{1} (x-1) + \frac{22}{2} (x-1)^2 + \frac{30}{6} (x-1)^3 \\
	&= 2 \cdot 1 + 10 (x-1) + 11 (x-1)^2 + 5 (x-1)^3
	\end{split}
	$$
	得到
	$$(a, b, c, d) = (2, 10, 11, 5)$$
	，因此
	$$a+b+c+d = 28$$
	Ans: (C)
</template>
