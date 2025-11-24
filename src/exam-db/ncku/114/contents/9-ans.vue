<template>
	<vk>
		<MultiOption :optionNames="['a', 'b', 'c', 'd', 'e']" :optionAnswers="[true, true, false, false, true]">
			<template #a>
				※ 行單範正交的矩陣 $Q$，滿足 $Q^T Q = I$。<br>
				$$ \implies~ \| Qx \| = (Qx)^H (Qx) = x^H Q^H Qx = x^H x = \| x \| $$
			</template>
			<template #b>
				注意到 $P$ 為向量 $b \in \mathbb{R}^m$ 投影到 $\text{Col}(A)$ 的投影矩陣，無論投影多少次都等於一次投影。<br>
				因此 $ P^k = P ,~ k \in \mathbb{Z}^+ $。
			</template>
			<template #c>
				行單範正交的矩陣 $U$，滿足 $U^T U = I$，不保證 $U U^T = I$。
			</template>
			<template #d>
				正定矩陣的特徵值全為正。<br>
				若對稱矩陣 $A$ 僅有兩個特徵值為負，其他為正，滿足 $\det(A) \gt 0$，但 $A$ 不是正定矩陣。
			</template>
			<template #e>
				$A \in \mathbb{R}^{n \times n}$ 是正定矩陣 $~\iff~ x^T A x \gt 0,~~ \forall x \in \mathbb{R}^n,~ x \neq 0$<br>
				令 $e_i \in \mathbb{R}^n$ 為第 $i$ 個元素為 $1$，其餘為 $0$ 的向量，則
				$$ {e_i}^T A e_i = A_{ii} \gt 0 $$
				，所以每個對角線元素 $A_{ii}$ 都是正數。
			</template>
		</MultiOption>
	</vk>
</template>
