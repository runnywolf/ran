<template>
	<vl exp="x_1 + x_2 + \cdots + x_n = r ~,~ x_i \gt 0" /><br>
	<vl exp="\Rightarrow~ (x_1'+1) + (x_2'+1) + \cdots + (x_n'+1) = r ~,~ x_i' \ge 0" /><br>
	<vl exp="\Rightarrow~ x_1' + x_2' + \cdots + x_n' = r-n ~,~ x_i' \ge 0" /><br>
	<vl exp="x_i" /> 為正整數解的組合數 <vl exp="= x_i'" /> 為非負整數解的組合數：
	<vl c exp="
		\begin{split}
		H^{n}_{r-n} &= \binom{n+(r-n)-1}{r-n} \\
		&= \binom{r-1}{r-n} \\
		&= \binom{r-1}{(r-1)-(r-n)} \\
		&= \binom{r-1}{n-1}
		\end{split}
	" />
	Ans: (A)
</template>
