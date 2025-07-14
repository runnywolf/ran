<template>
	<vk>
		根據 Cayley-Hamilton 定理：
		$$f_T(T) = T^4 - 2T^2 + I = 0$$
		嘗試化簡線性算子 $S$：
		$$
		\begin{split}
		S &= T^6 - 2T^5 - T^4 + 4T^3 - T^2 - 2T \\
		&= T^6 - T^4 - T^2 + (- 2T^5 + 4T^3 - 2T) \\
		&= (T^6 - 2T^4 + T^2) + T^4 - 2T^2 - 2T(T^4 - 2T^2 + I) \\
		&= T^2(T^4 - 2T^2 + I) + (T^4 - 2T^2 + I) - I - 2T(T^4 - 2T^2 + I) \\
		&= -I
		\end{split}
		$$
		因此 $\text{rk}(S) = \text{rk}(-I) = n$，可知 $S$ 滿秩。<br>
		<br>
		而 $f_T(0) = 1$<br>
		$\Rightarrow~ 0$ 不是線性算子 $T$ 的特徵值<br>
		$\Rightarrow~ \det(T) \neq 0 \quad$ ( 行列式為所有特徵值之積 )<br>
		$\Rightarrow~ T$ 非奇異<br>
		$\Rightarrow~ T$ 滿秩<br>
		<br>
		因為 $S$ 與 $T$ 維度相同，所以 $\text{rk}(S) = \text{rk}(T)$。<br>
		<br>
		題目說要用 $\text{rank}(T)$ 表示 $\text{rank}(S)$，因此答案為 $\boxed{ \text{rank}(T) }$。
	</vk>
</template>
