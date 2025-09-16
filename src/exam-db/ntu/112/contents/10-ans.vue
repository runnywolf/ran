<template>
	<MultiOption :optionNames="['A', 'B', 'C', 'D', 'E']" :optionAnswers="[true, true, false, false, true]">
		<template #A>
			(1) 證明 $N(A) \sube N(A^T A)$：<br>
			假設 $x \in N(A)$<br>
			$\Rightarrow ~ Ax = 0$<br>
			$\Rightarrow ~ A^T (Ax) = A^T 0$<br>
			$\Rightarrow ~ (A^T A)x = 0$<br>
			$\Rightarrow ~ x \in N(A^T A)$<br>
			因此 $N(A) \sube N(A^T A)$<br>
			<br>
			(2) 證明 $N(A^T A) \sube N(A)$：<br>
			假設 $x \in N(A^T A)$<br>
			$\Rightarrow ~ (A^T A)x = 0$<br>
			$\Rightarrow ~ x^T A^T A x = x^T 0$<br>
			$\Rightarrow ~ (Ax)^T (Ax) = {\| Ax \|}^2 = 0$<br>
			$\Rightarrow ~ {\| Ax \|} = 0$<br>
			$\Rightarrow ~ Ax = 0$<br>
			$\Rightarrow ~ x \in N(A)$<br>
			因此 $N(A^T A) \sube N(A)$<br>
			<br>
			由於已證明 $N(A) \sube N(A^T A)$ 且 $N(A^T A) \sube N(A)$，<br>
			根據集合定義得出： $N(A^T A) = N(A)$
		</template>
		<template #B>
			正交矩陣 $A$ 的特徵值 $\lambda(A) = \{ -1, 1 \}$<br>
			$A + \frac{1}{2} I$ 的特徵值為 $\lambda(A) + \frac{1}{2}$：
			$$\lambda(A + \frac{1}{2}) = \{ \frac{-1}{2} , \frac{3}{2} \}$$
			可知 $A + \frac{1}{2} I$ 的特徵值 $\neq 0$，<br>
			而行列式為所有特徵值之乘積，因此
			$\det(A + \frac{1}{2}I) \neq 0$。<br>
			$\Rightarrow ~ A + \frac{1}{2} I$ 可逆。
		</template>
		<template #C>
			$A$ 的特徵值小於 $n$ 個<br>
			$\Rightarrow$ 特徵多項式的某個特徵值 $\lambda_i$
			有重根 ( 代數重數 $k_i \gt 1$)<br>
			<br>
			如果所有的特徵值 $\lambda_i$ 都可以對應到 $k_i$ 個特徵向量 ( 代數重數 = 幾何重數 )，<br>
			即 $\forall \lambda_i ~,~ \text{dim}[ N(A - \lambda_i I) ] = k_i$，則 $A$
			可對角化。
		</template>
		<template #D>
			(1) 若 $A$ 為實對稱矩陣，則特徵值為實數：<br>
			假設 $A$ 的特徵值 $\lambda \in \Complex$ 對應到特徵向量
			$x \in \Complex^n$，根據特徵值的定義 $Ax = \lambda x$，則<br>
			$$\langle Ax, x \rangle = \langle \lambda x, x \rangle = \lambda \langle x, x \rangle$$
			換個方向
			<div class="ts-list is-unordered">
				<div class="item">
					在複數域下 $\langle Ax, x \rangle = \langle x, A^H x \rangle$
				</div>
				<div class="item">
					$A$ 為實對稱矩陣，取共軛值不變，所以 $A^H = A$
				</div>
			</div>
			所以
			$$
			\langle Ax, x \rangle = \langle x, A^H x \rangle = \langle x, Ax \rangle
			= \langle x, \lambda x \rangle = \overline{\lambda} \langle x, x \rangle
			$$
			<br>
			根據上面兩個等式，得知
			$\langle Ax, x \rangle = \lambda \langle x, x \rangle = \overline{\lambda} \langle x, x \rangle$
			<br>
			移項後得到：
			$$(\lambda - \overline{\lambda}) \langle x, x \rangle = 0$$
			<br>
			$x$ 為特徵向量<br>
			$\Rightarrow ~ x \neq 0$<br>
			$\Rightarrow ~ \langle x, x \rangle \neq 0$<br>
			$\Rightarrow ~ (\lambda - \overline{\lambda})$ 必須為 $0$ 才能使上面的等式成立<br>
			$\Rightarrow ~ \lambda = \overline{\lambda}$<br>
			$\Rightarrow ~ \lambda$ 取共軛後值不變，代表 $\lambda \in \R$<br>
			<br>
			(2) 若 $A$ 為實對稱矩陣，則特徵向量兩兩正交：<br>
			不一定，重根特徵值對應的特徵空間內的兩個特徵向量不一定正交。
		</template>
		<template #E>
			根據定義，正定矩陣一定要滿足 $A^H = A$，也就是厄米特矩陣。<br>
			在這個條件下，$A$ 必可么正對角化：
			$$A = V D V^{-1}$$
			取 $U = V D^{1/2} V^{-1}$，其中對角線元素 $(D^{1/2})_{ii} = (D_{ii})^{1/2}$，則
			$$
			\begin{split}
			U^2 &= V D^{1/2} V^{-1} V D^{1/2} V^{-1} \\
			&= V D^{1/2} D^{1/2} V^{-1} \\
			&= V D V^{-1} \\
			&= A
			\end{split}
			$$
			由於
			$$
			\begin{split}
			U^{-1} &= (V D^{1/2} V^{-1})^{-1} \\
			&= (V^{-1})^{-1} (D^{1/2})^{-1} V^{-1} \\
			&= V D^{-1/2} V^{-1}
			\end{split}
			$$
			$\Rightarrow ~ U$ 可逆<br>
			$\Rightarrow ~ U$ 為非奇異矩陣<br>
			<br>
			綜上所述，若 $A$ 正定，則存在非奇異矩陣 $U = V D^{1/2} V^{-1}$ 滿足 $A = U^2$。
		</template>
	</MultiOption>
</template>
