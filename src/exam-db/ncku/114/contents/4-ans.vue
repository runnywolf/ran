<template>
	遞迴關係式為 $a_n - 3a_{n-1} = 5(3^n)$<br>
	$\Rightarrow~$ 特徵方程式為 $\lambda - 3 = 0$<br>
	$\Rightarrow~$ 特徵值 $\lambda = 3$<br>
	$\Rightarrow~$ 設齊次解為 $a_n^{(h)} = h_1 3^n$<br>
	<br>
	遞迴的非齊次部分為 $5(3^n)$，設特解為 $a_n^{(p)} = p_1 n 3^n$ 保證與齊次解的線性獨立性。<br>
	<br>
	因此一般項的形式為
	$$a_n = a_n^{(h)} + a_n^{(p)} = (h_1 + p_1 n) 3^n$$
	，可以發現選項 (b)(c) 的指數部分不是 $3^n$，不可能為正確答案。<br>
	<br>
	將 $n = 0$ 代入選項 (a)(d)，分別得到 $a_0 = 1$ 和 $a_0 = 2$，因此 (d) 正確。
</template>
