<template>
	<vk>
		令 $A = @bm{ a, b; c, d }$，則
		$$ A^2 = @bm{ a^2+bc, b(a+d); c(a+d), cb+d^2 } = @bm{ -1, 0; 0, -1 } = -I $$
		$c(a+d) = 0$，如果 $c = 0$ 的話：
		$$ A^2 = @bm{ a^2, b(a+d); 0, d^2 } = @bm{ -1, 0; 0, -1 } $$
		$\Rightarrow~ a = \pm i$，但是矩陣 $A$ 的元素是實數 (不合)。<br>
		$\Rightarrow~ c \neq 0$<br>
		$c(a+d) = 0$ 所以 $a+d = 0$<br>
		$\Rightarrow~ d = -a$<br>
		<br>
		代入 $A^2$ 後得到：
		$$ A^2 = @bm{ a^2+bc, 0; 0, a^2+bc } = @bm{ -1, 0; 0, -1 } $$
		，所以實矩陣 $A = @bm{ a, b; c, d }$ 只要滿足 $a^2+bc = -1$ 和 $d = -a$，那麼 $A^2 = -I$。
	</vk>
</template>
