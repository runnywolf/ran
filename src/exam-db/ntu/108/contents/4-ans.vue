<template>
	$$
	\begin{split}
	\sum\limits_{k=1}^{n} \binom{n}{k} \binom{n}{k-1}
	&= \binom{n}{0} \binom{n}{1} + \binom{n}{1} \binom{n}{2} + \cdots + \binom{n}{n-1} \binom{n}{n} \\
	&= \binom{n}{0} \binom{n}{n-1} + \binom{n}{1} \binom{n}{n-2} + \cdots + \binom{n}{n-1} \binom{n}{0}
	\end{split}
	$$
	組合證明 (Combinatorial Proof)：<br>
	「$2n$ 個人選出 $n-1$ 人，有 $\binom{2n}{n-1}$ 選法」等於以下所有情況的總和：<br>
	<div class="ts-list is-unordered">
		<div class="item">
			先從 A 組 $n$ 個人選出 $0$ 人，再從 B 組 $n$ 個人選出 $n-1$ 人，有 $\binom{n}{0} \binom{n}{n-1}$ 種選法。
		</div>
		<div class="item">
			先從 A 組 $n$ 個人選出 $1$ 人，再從 B 組 $n$ 個人選出 $n-2$ 人，有 $\binom{n}{1} \binom{n}{n-2}$ 種選法。
		</div>
		<div class="item">
			&nbsp;⋮
		</div>
		<div class="item">
			先從 A 組 $n$ 個人選出 $n-1$ 人，再從 B 組 $n$ 個人選出 $0$ 人，有 $\binom{n}{n-1} \binom{n}{0}$ 種選法。
		</div>
	</div>
	<br>
	因此
	$$ \sum\limits_{k=1}^{n} \binom{n}{k} \binom{n}{k-1} = \binom{2n}{n-1} = \binom{A}{B} $$
	所以
	$$ \begin{split} A ~&=~ \boxed{ 2n } \\ B ~&=~ \boxed{ n-1 } \end{split} $$
</template>
