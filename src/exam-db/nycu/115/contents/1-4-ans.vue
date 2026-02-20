<template>
	<vk>
		<MultiOption :optionNames="['1', '2', '3', '4']" :optionAnswers="[false, false, true, true]">
			<template #1>
				應該是 $A$ 的行向量線性獨立 $\Leftrightarrow A$ 非奇異：<br>
				方陣 $A$ 的行向量線性獨立
				$~~\Leftrightarrow~~ \text{rank}(A) = n ~~\Leftrightarrow~~ \det(A) \neq 0 ~~\Leftrightarrow~~ A$ 非奇異<br>
				<br>
				反例：$A = @bm{1, 0; 0, 1}$，行向量線性獨立但非奇異。
			</template>
			<template #2>
				$x = 0 ~~\Rightarrow~~ Ax = A0 = 0$<br>
				但是只有在 $A$ 可逆時，$Ax = 0 ~~\Rightarrow~~ x = A^{-1} 0 = 0$。<br>
				<br>
				反例：$Ax = @bm{1, 0; 0, 0} @bm{0; 1} = 0$。
			</template>
			<template #3>
				只要是「 有限維度向量空間的線性映射 」，例如 $A \in \mathbb{R}^{n \times n}$，Rank-Nullity Theorem 一定成立：
				$$ \text{rank}(A) + \text{nullity}(A) = n $$
			</template>
			<template #4>
				$A$ 的行秩一定等於列秩，所以轉置不影響秩：$\text{rank}(A) = \text{rank}(A^T)$。
			</template>
		</MultiOption>
	</vk>
</template>
