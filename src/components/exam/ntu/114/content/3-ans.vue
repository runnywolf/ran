<template>
	<vl exp="\{ A, B, C, D \} \times \{ 1, 2, 3, 4, 5 \}" />
	總共有 <vl exp="4 \times 5 = 20" /> 個關係。<br>
	其中每個關係可以存在或不存在，可知二元關係的數量 <vl exp="N = 2^{20}" />。<br>
	因此
	<vl c exp="
		\begin{split}
		N ~\text{mod}~ 13 &= 2^{20} ~\text{mod}~ 13 \\
		&= 16^5 ~\text{mod}~ 13 \\
		&= (16 ~\text{mod}~ 13)^5 ~\text{mod}~ 13 \\
		&= 3^5 ~\text{mod}~ 13 \\
		&= 27 \cdot 9 ~\text{mod}~ 13 \\
		&= (27 ~\text{mod}~ 13)(9 ~\text{mod}~ 13) ~\text{mod}~ 13 \\
		&= 1 \cdot 9 ~\text{mod}~ 13 \\
		&= 9
		\end{split}
	" />
</template>
