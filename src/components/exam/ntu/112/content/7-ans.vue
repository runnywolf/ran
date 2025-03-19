<template>
	<vl exp="f(x) \in P_2(\R)" /><br>
	<vl exp="\Rightarrow" /> 設 <vl exp="f(x) = a_0 + a_1 x + a_2 x^2" />
	對應到 <vl exp="\!\begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}\! \in \R^3" /><br>
	<br>
	化簡線性變換 <vl exp="T" />：
	<vl c exp="
		\begin{split}
			T(f(x)) &= f''(x) + 2f'(x) - f(x) \\
							&= 2a_2 + 2(a_1 + 2a_2 x) - (a_0 + a_1 x + a_2 x^2) \\
							&= (-a_0 + 2a_1 + 2a_2) + (-a_1 + 4a_2)x + (-a_2)x^2
		\end{split}
	" />
	將 <vl exp="f(x)" /> 對應到 <vl exp="\R^3" />：
	<vl c exp="
		M \!\begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}\!
		= \!\begin{bmatrix} -a_0 & +2a_1 & +2a_2 \\ & -a_1 & +4a_2 \\ & & -a_2 \end{bmatrix}\!
		= \!\begin{bmatrix} -1 & 2 & 2 \\ 0 & -1 & 4 \\ 0 & 0 & -1 \end{bmatrix}\!
			\!\begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}\!
	" />
	<vl exp="\Rightarrow ~ M = \!\begin{bmatrix} -1 & 2 & 2 \\ 0 & -1 & 4 \\ 0 & 0 & -1 \end{bmatrix}\!" /><br>
	<br>
	※ <vl exp="M^{-1} + 2I" /> 的行列式等於所有特徵值之乘積。<br>
	<vl exp="M" /> 為上三角矩陣，特徵值為對角線元素：<br>
	<vl c exp="\lambda(M) = \{-1, -1, -1\}" />
	而 <vl exp="M^{-1} + 2I" /> 的特徵值為 <vl exp="\lambda(M)^{-1} + 2" />：<br>
	<vl c exp="\lambda(M^{-1} + 2I) = \{1, 1, 1\}" />
	則 <vl exp="M^{-1} + 2I" /> 的行列式
	<vl c exp="\text{det}(M^{-1} + 2I) = 1 \cdot 1 \cdot 1 = 1" />
	Ans: (B)
</template>
