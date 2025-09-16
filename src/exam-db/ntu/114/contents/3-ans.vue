<template>
	$\{ A, B, C, D \} \times \{ 1, 2, 3, 4, 5 \}$ 總共有 $4 \times 5 = 20$ 個關係。<br>
	其中每個關係可以存在或不存在，可知二元關係的數量 $N = 2^{20}$。<br>
	$2, 13$ 互質，因此可以用費馬小定理：
	$$
	\begin{split}
	N ~\text{mod}~ 13 &= 2^{20} ~\text{mod}~ 13 \\
	&= 2^{20 ~\text{mod}~ 12} ~\text{mod}~ 13 \\
	&= 2^8 ~\text{mod}~ 13 \\
	&= 16^2 ~\text{mod}~ 13 \\
	&= (16 ~\text{mod}~ 13)^2 ~\text{mod}~ 13 \\
	&= 3^2 ~\text{mod}~ 13 \\
	&= 9 ~\text{mod}~ 13 \\
	&= \boxed{ 9 }
	\end{split}
	$$
</template>
