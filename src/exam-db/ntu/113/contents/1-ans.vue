<template>
	<vk>
		令集合 $A = \{ ``A", ``B" \}^3 ~,~ B = \{ 1, 2, 3 \}$。<br>
		對於 $A$ 之中的每個元素，有 $|B|$ 種映射選擇。<br>
		這題只求函數的個數，不考慮單射和滿射，所以 $A$ 的每個元素的選擇互相獨立。<br>
		函數的組合數量 $z = |B|^{|A|} = 3^{2^3} = 3^8$<br>
		因此
		$$
		\begin{split}
		z ~\text{mod}~ 7 &= 3^8 ~\text{mod}~ 7 \\
		&= 3^{8 ~\text{mod}~ \varphi(7)} ~\text{mod}~ 7 \\
		&= 3^{8 ~\text{mod}~ 6} ~\text{mod}~ 7 \\
		&= 3^2 ~\text{mod}~ 7 \\
		&= \boxed{2}
		\end{split}
		$$
	</vk>
</template>
