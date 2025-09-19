<template>
	<vk>
		<MultiOption :optionNames="['a', 'b', 'c', 'd', 'e', 'f', 'g']" :optionAnswers="[false, true, true, false]">
			<template #a>
				假設 $A \in \mathbb{R}^{2 \times 2}$ 有兩個特徵值 $1, t$，則 $\det(A) = 1 \cdot t = t$。<br>
				當 $t = 0$ 時，$\det(A) = 0 \Rightarrow A$ 不可逆。<br>
				當 $t \neq 0$ 時，$\det(A) \neq 0 \Rightarrow A$ 可逆。<br>
				因此這個陳述不一定正確。<br>
				<br>
				應該改為：方陣 $A$ 可逆 $~\Leftrightarrow~ 0$ 不是 $A$ 的一個特徵值。
			</template>
			<template #b>
				正交補空間一定是向量空間。
			</template>
			<template #c>
				證 $N(A) \sube N(EA)$：<br>
				若 $x \in N(A)$<br>
				$\Rightarrow~ Ax = 0$<br>
				$\Rightarrow~ EAx = 0$<br>
				$\Rightarrow~ x \in N(EA)$<br>
				<br>
				證 $N(EA) \sube N(A)$：<br>
				若 $x \in N(EA)$<br>
				$\Rightarrow~ EAx = 0$<br>
				$\Rightarrow~ E^{-1}(EAx) = 0$<br>
				$\Rightarrow~ Ax = 0$<br>
				$\Rightarrow~ x \in N(A)$<br>
				<br>
				根據集合定義得出：$N(A) = N(EA)$
			</template>
			<template #d>
				向量空間 $\text{span}(f, g) = \text{span}(\cos^2 x,~ \sin^2 x)$ 裡的函數都是固定值域的週期性函數：
				$$ a \cos^2 x + b \sin^2 x = c + d \sin^2 x $$
				而 $h = 1+x^2$ 在 $x \to \infty$ 時趨近無窮，不可能在 $\text{span}(f, g)$ 之內。
			</template>
			<template #e>
				$Ax = 0$ 的解的參數個數，也就是 $N(A)$ 的維度 $\text{nullity}(A)$。<br>
				根據秩-零化度定理
				(<RanLink to="https://en.wikipedia.org/wiki/Rank%E2%80%93nullity_theorem">rank-nullity theorem</RanLink>)
				$$\text{nullity}(A) = 7 - \text{rk}(A) = \boxed{4}$$
				你可以試著將 $A$ 化簡成列梯矩陣，可以發現列梯矩陣剩餘的 3 個列可以將 $x$ 的 3 個變數替換成另外 4 個變數的線性組合。
			</template>
			<template #f>
				$Ax = 0$ 有 2 維的解空間，代表 $N(A)$ 的維度 $\text{nullity}(A) = 2$。<br>
				根據秩-零化度定理
				(<RanLink to="https://en.wikipedia.org/wiki/Rank%E2%80%93nullity_theorem">rank-nullity theorem</RanLink>)
				$$\text{rk}(A) = 6 - \text{nullity}(A) = \boxed{4}$$
			</template>
			<template #g>
				$(k, 21, -12)$ 可以表示成 $(-2, 2, 1)$ 和 $(2, 1, -2)$ 的線性組合，因此
				$$\begin{split} a(-2, 2, 1) + b(2, 1, -2) &= (-2a+2b,~2a+b,~a-2b) \\ &= (k, 21, -12) \end{split}$$
				，列聯立解 $a, b$：
				$$\begin{cases} 2a+b=21 \\ a-2b=-12 \end{cases}$$
				，得到
				$$a=6 \quad;\quad b=9$$
				，因此
				$$k = -2a+2b = \boxed{6}$$
			</template>
		</MultiOption>
	</vk>
</template>
