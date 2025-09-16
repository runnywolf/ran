<template>
	<MultiOption :optionNames="['a', 'b', 'c', 'd', 'e']" :optionAnswers="[true, false, false, false, true]">
		<template #a>
			正定矩陣 $A$ 的所有特徵值 $\lambda_i$ 皆大於 $0$<br>
			$\Rightarrow~ \det(A) = \lambda_1 \lambda_2 \,\cdots \lambda_n \gt 0$<br>
			$\Rightarrow~ \det(A) \neq 0$<br>
			$\Rightarrow~ A$ 可逆
		</template>
		<template #b>
			反例：
			$$\det(2I_2 - I_2) = \det(I_2) = 1 \\ \det(2I_2) - \det(I_2) = 4 - 1 = 3$$
		</template>
		<template #c>
			如果 $u$ 垂直於子空間 $W$ 當中的所有向量，則 $u \in W^\perp$，<br>
			而正交補空間 $W^\perp$ 的維度如果 $\gt 0$，那麼 $u$ 不一定是零向量。
		</template>
		<template #d>
			$\text{nullity}(A) = 0$<br>
			$\Rightarrow~ A$ 滿秩<br>
			$\Rightarrow~ A$ 可逆 (因為 $A$ 為方陣)<br>
			$\Rightarrow~ x = A^{-1} b$<br>
			$\Rightarrow~ Ax = b$ 並非矛盾方程式<br>
			反證法：若 $Ax = b$ 為矛盾方程式，則 $\text{nullity} \neq 0$。<br>
			如果有某些向量 $b$ 使 $Ax = b$ 為矛盾方程式，則 $A$ 的零化度不一定為 $0$。
		</template>
		<template #e>
			有一組 $A$ 的特徵向量可以組成 $\mathbb{R}^n$ 的基底<br>
			$\Rightarrow~$ 這 $n$ 組特徵向量線性獨立<br>
			$\Rightarrow~$ 這 $n$ 組特徵向量可以組成可逆矩陣 $P$，使 $P^{-1} A P = D$，其中 $D$ 為特徵值構成的對角矩陣<br>
			$\Rightarrow~ A$ 可被對角化
		</template>
	</MultiOption>
</template>
