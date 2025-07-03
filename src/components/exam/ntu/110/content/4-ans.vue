<template>
	用巴斯卡定理
	<vl c exp="\binom{n}{m} + \binom{n}{m+1} = \binom{n+1}{m+1}" />
	合併下面的式子：
	<vl c exp="
		\begin{split}
		\sum\limits_{k=m}^n \binom{k}{m} &= \binom{m}{m} + \binom{m+1}{m} + \binom{m+2}{m} + \cdots + \binom{n}{m} \\
		&= \binom{m+1}{m+1} + \binom{m+1}{m} + \binom{m+2}{m} + \cdots + \binom{n}{m} \\
		&= \binom{m+2}{m+1} + \binom{m+2}{m} + \cdots + \binom{n}{m} \\
		&= \binom{m+3}{m+1} + \cdots + \binom{n}{m} \\
		& ~~ \vdots \\
		&= \binom{n}{m+1} + \binom{n}{m} \\
		&= \binom{n+1}{m+1} \\
		&= \binom{A}{B}
		\end{split}
	" />
	得到
	<vl c exp="A = \boxed{ n+1 } \quad;\quad B = \boxed{ m+1 }" />
</template>
