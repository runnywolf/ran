<template>
	<vk>
		令 $x_1', x_2', x_3' \in [0, 3]$，則 $$ x_1 = x_1'+2 ~,\quad x_2 = x_2'+3 ~,\quad x_3 = x_3'+4 $$
		，做變數代換：
		$$
		\begin{split}
		& x_1 + 2x_2 + x_3 = 17 \\
		\implies ~& (x_1'+2) + 2(x_2'+3) + (x_3'+4) = 17 \\
		\implies ~& x_1' + 2x_2' + x_3' = 5 \\
		\end{split}
		$$
		窮舉 $x_2' \in [0, 3]$：
		<div class="ts-list is-unordered">
			<div class="item">
				當 $x_2' = 0 ~\Rightarrow~ x_1' + x_3' = 5$，$(x_1', x_3')$ 可以是 $(2, 3), (3, 2)$，共 $2$ 組解。
			</div>
			<div class="item">
				當 $x_2' = 1 ~\Rightarrow~ x_1' + x_3' = 3$，$(x_1', x_3')$ 可以是 $(0, 3), (1, 2), (2, 1), (3, 0)$，共 $4$ 組解。
			</div>
			<div class="item">
				當 $x_2' = 2 ~\Rightarrow~ x_1' + x_3' = 1$，$(x_1', x_3')$ 可以是 $(0, 1), (1, 0)$，共 $2$ 組解。
			</div>
			<div class="item">當 $x_2' = 3 ~\Rightarrow~ x_1' + x_3' = -1$，無解。</div>
		</div>
		<br>
		總共有 $8$ 組解，答案為 (a)。
	</vk>
</template>
