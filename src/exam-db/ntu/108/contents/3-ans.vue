<template>
	等式兩邊同乘 $2$，得到
	$$
	\begin{split}
	\binom{A}{B} &= 2 \left[ \binom{2n}{n+1} + \binom{2n}{n} \right] \\
	&= \binom{2n}{n+1} + \binom{2n}{n} + \binom{2n}{n} + \binom{2n}{n+1} \\
	&= \binom{2n}{n+1} + \binom{2n}{n} + \binom{2n}{n} + \binom{2n}{n-1} \\
	&= \binom{2n+1}{n+1} + \binom{2n+1}{n} \\
	&= \binom{2n+2}{n+1}
	\end{split}
	$$
	所以
	$$ \begin{split} A ~&=~ \boxed{ 2n+2 } \\ B ~&=~ \boxed{ n+1 } \end{split} $$
</template>
