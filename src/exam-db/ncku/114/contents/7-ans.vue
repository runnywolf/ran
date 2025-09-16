<template>
	<MultiOption :optionNames="['A', 'B', 'C', 'D']" :optionAnswers="[true, true, true, false]">
		<template #A>
			已知 $N(A) = N(A^T A)$，可以參考
			<RanLink to="#/exam/ntu-112/10" newTab>台大 112 第 10 題選項 (A)</RanLink> 的證明。<br>
			若將 $A$ 代換成 $A^T$，$N(A^T) = N(A A^T)$ 仍然成立。<br>
			<br>
			向量空間 $N(A)$ 的維度為 $\text{nullity}(A)$，因此
			$$\text{nullity}(A) = \text{nullity}(A^T A) \quad;\quad \text{nullity}(A^T) = \text{nullity}(A A^T)$$
			<br>
			根據<RanLink to="https://en.wikipedia.org/wiki/Rank%E2%80%93nullity_theorem#Matrices">秩-零化度定理</RanLink>
			<span>，因為 $A A^T \in \mathbb{F}^{m \times m} ,~ A^T \in \mathbb{F}^{n \times m}$，所以</span>
			$$\text{rk}(A A^T) = m - \text{nullity}(A A^T) = m - \text{nullity}(A^T) = \text{rk}(A^T) = \text{rk}(A)$$
			，而 $A \in \mathbb{F}^{m \times n} ,~ A^T A \in \mathbb{F}^{n \times n}$，因此
			$$\text{rk}(A) = n - \text{nullity}(A) = n - \text{nullity}(A^T A) = \text{rk}(A^T A)$$
			，得證。
		</template>
		<template #B>
			正交矩陣的定義 $Q^T Q = Q Q^T = I$，而
			$$(Q^T)^T (Q^T) = Q Q^T = I$$
			，因此 $Q^T$ 也是正交矩陣。
		</template>
		<template #C>
			線性變換 $L$ 的定義：<br>
			(1) 對於 $V$ 內的向量 $x, y$，$L(x + y) = L(x) + L(y)$。<br>
			(2) 對於 $V$ 內的向量 $x$，以及純量 $a$，$L(a \cdot x) = a \cdot L(x)$。<br>
			<br>
			$$L(v_1) - L(v_2) = 0$$
			，根據定義 (2) 和 (1)，
			$$L(v_1) - L(v_2) = L(v_1) + L(-v_2) = L(v_1 - v_2) = 0$$
			，可以發現向量 $v_1 - v_2$ 在 $L$ 的核空間內。
		</template>
		<template #D>
			若矩陣 $A, B$ 是列等價的，則 $A$ 可以通過多次的矩陣列運算轉換成 $B$，反之亦然。<br>
			但是，交換矩陣的兩列會使行列式異號，因此 $A, B$ 的行列式不一定會相同。
		</template>
	</MultiOption>
</template>
