<template>
	<vk>
		令 $G = (V, E) ~,~~ V = \{ a_1, a_2, \cdots\!, a_v \}$<br>
		<br>
		假設「 $G$ 存在至少一個度數 $\le 5$ 的節點 」不成立。<br>
		$\Rightarrow~ G$ 的所有節點的度數皆 $\ge 6$。<br>
		$\Rightarrow~ \deg(a_i) \ge 6 ~~\text{for}~~ i = 1, \cdots\!, v$<br>
		$\Rightarrow~ 2e = \sum\limits_{i = 1}^v \deg(a_i) \ge 6v$<br>
		$\Rightarrow~ e \ge 3v$，與定理 $e \le 3v-6$ 矛盾。<br>
		<br>
		因此「 $G$ 存在至少一個度數 $\le 5$ 的節點 」一定成立。
	</vk>
</template>
