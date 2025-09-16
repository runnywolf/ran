<template>
	$f(x) \in P_2(\R)$<br>
	$\Rightarrow$ 設 $f(x) = a_0 + a_1 x + a_2 x^2$
	對應到 $\!\begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}\! \in \R^3$<br>
	<br>
	化簡線性變換 $T$：
	$$
	\begin{split}
	T(f(x)) &= f''(x) + 2f'(x) - f(x) \\
	&= 2a_2 + 2(a_1 + 2a_2 x) - (a_0 + a_1 x + a_2 x^2) \\
	&= (-a_0 + 2a_1 + 2a_2) + (-a_1 + 4a_2)x + (-a_2)x^2
	\end{split}
	$$
	將 $f(x)$ 對應到 $\R^3$：
	$$
	M \!\begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}\!
	= \!\begin{bmatrix} -a_0 & +2a_1 & +2a_2 \\ & -a_1 & +4a_2 \\ & & -a_2 \end{bmatrix}\!
	= \!\begin{bmatrix} -1 & 2 & 2 \\ 0 & -1 & 4 \\ 0 & 0 & -1 \end{bmatrix}\!
	\!\begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}\!
	$$
	$\Rightarrow ~ M = \!\begin{bmatrix} -1 & 2 & 2 \\ 0 & -1 & 4 \\ 0 & 0 & -1 \end{bmatrix}\!$<br>
	<br>
	※ $M^{-1} + 2I$ 的行列式等於所有特徵值之乘積。<br>
	$M$ 為上三角矩陣，特徵值為對角線元素：<br>
	$$\lambda(M) = \{-1, -1, -1\}$$
	而 $M^{-1} + 2I$ 的特徵值為 $\lambda(M)^{-1} + 2$：<br>
	$$\lambda(M^{-1} + 2I) = \{1, 1, 1\}$$
	則 $M^{-1} + 2I$ 的行列式
	$$\det(M^{-1} + 2I) = 1 \cdot 1 \cdot 1 = 1$$
	Ans: (B)
</template>
