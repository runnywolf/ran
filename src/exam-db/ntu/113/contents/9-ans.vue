<template>
	根據 Cayley-Hamilton 定理：
	<vl c exp="f_T(T) = T^4 - 2T^2 + I = 0" />
	嘗試化簡線性算子 <vl exp="S" />：
	<vl c exp="
		\begin{split}
		S &= T^6 - 2T^5 - T^4 + 4T^3 - T^2 - 2T \\
		&= T^6 - T^4 - T^2 + (- 2T^5 + 4T^3 - 2T) \\
		&= (T^6 - 2T^4 + T^2) + T^4 - 2T^2 - 2T(T^4 - 2T^2 + I) \\
		&= T^2(T^4 - 2T^2 + I) + (T^4 - 2T^2 + I) - I - 2T(T^4 - 2T^2 + I) \\
		&= -I
		\end{split}
	" />
	因此 <vl exp="\text{rk}(S) = \text{rk}(-I) = n" />，可知 <vl exp="S" /> 滿秩。<br>
	<br>
	而 <vl exp="f_T(0) = 1" /><br>
	<vl exp="\Rightarrow~ 0" /> 不是線性算子 <vl exp="T" /> 的特徵值<br>
	<vl exp="\Rightarrow~ \det(T) \neq 0 \quad" /> ( 行列式為所有特徵值之積 )<br>
	<vl exp="\Rightarrow~ T" /> 非奇異<br>
	<vl exp="\Rightarrow~ T" /> 滿秩<br>
	<br>
	因為 <vl exp="S" /> 與 <vl exp="T" /> 維度相同，所以 <vl exp="\text{rk}(S) = \text{rk}(T)" />。<br>
	<br>
	題目說要用 <vl exp="\text{rank}(T)" /> 表示 <vl exp="\text{rank}(S)" />，因此答案為
	<vl exp="\boxed{ \text{rank}(T) }" />。
</template>
