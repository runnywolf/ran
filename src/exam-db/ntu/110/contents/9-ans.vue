<template>
	<MultiOption :optionNames="[ 'a', 'b', 'c', 'd', 'e' ]" :optionAnswers="[true, false, true, false, false]">
		<template #a>
			當滿足 $AB = BA$ 時，注意到
			$$
			\begin{split}
			&\quad (A^{-1} - A^{-2} B + A^{-3} B^2 - A^{-4} B^3 + \cdots + (-1)^k A^{-(k+1)} B^k ) (A + B) \\
			&= A^{-1} A + A^{-1} B - A^{-2} BA - A^{-2} B^2 + A^{-3} B^2 A + A^{-3} B^3 + \cdots + (-1)^k A^{-(k+1)} B^{k+1} \\
			&= A^{-1} A + A^{-1} B - A^{-2} AB - A^{-2} B^2 + A^{-3} A B^2 + A^{-3} B^3 + \cdots + (-1)^k A^{-(k+1)} B^{k+1} \\
			&= A^{-1} A + A^{-1} B - A^{-1} B - A^{-2} B^2 + A^{-2} B^2 + A^{-3} B^3 + \cdots + (-1)^k A^{-(k+1)} B^{k+1} \\
			&= I + (-1)^k A^{-(k+1)} B^{k+1} ~~,~~ k \ge 0
			\end{split}
			$$
			由於 $B^3 = 0$，可以只考慮 $k = 2$ 的情況：
			$$(A^{-1} - A^{-2} B + A^{-3} B^2) (A + B) = I + (-1)^2 A^{-3} B^3 = I$$
			可知
			$$(A + B)^{-1} = A^{-1} - A^{-2} B + A^{-3} B^2$$
			，因此 $A + B$ 可逆。
		</template>
		<template #b>
			因為集合 $S$ 內的序列剛好包含 $N$ 個非零元素，因此
			$(0, 0, \cdots) \notin S$，所以 $S$ 不是向量空間。<br>
			而且沒有封閉性：$\pm x \in S ~~,~~ x+(-x) = (0, 0, \cdots) \notin S$
		</template>
		<template #c>
			方陣 $A$ 可以分解為：
			$$A = \frac{A + A^T}{2} + \frac{A - A^T}{2}$$
			其中 $\frac{A + A^T}{2}$ 為對稱矩陣：
			$$\left( \frac{A + A^T}{2} \right)^T = \frac{(A)^T + (A^T)^T}{2} = \frac{A + A^T}{2}$$
			，$\frac{A - A^T}{2}$ 為反對稱矩陣：
			$$\left( \frac{A - A^T}{2} \right)^T = \frac{(A)^T - (A^T)^T}{2} = \frac{A^T - A}{2} = -\frac{A - A^T}{2}$$
		</template>
		<template #d>
			若 $A, B$ 相似，則它們的特徵值相同，且存在可逆矩陣 $P$ 使
			$$B = P^{-1} A P$$
			。若 $x$ 為 $A$ 的特徵向量，對應到特徵值 $\lambda$：
			$$Ax = \lambda x$$
			則 $B$ 存在特徵向量 $P^{-1} x$，對應到特徵值 $\lambda$：
			$$B (P^{-1} x) = P^{-1} A P (P^{-1} x) = P^{-1} Ax = P^{-1} (\lambda x) = \lambda (P^{-1} x)$$
			所以如果 $A, B$ 相似，它們的特徵向量不一定相同。
		</template>
		<template #e>
			存在反例：
			$$\text{rk}([0] - [1]) \le \text{rk}([0]) - \text{rk}([1]) = 0-1 = -1$$
			因為矩陣的秩不可能是負的。
		</template>
	</MultiOption>
</template>
