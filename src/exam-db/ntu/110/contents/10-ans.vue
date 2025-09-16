<template>
	<MultiOption :optionNames="[ 'a', 'b', 'c', 'd', 'e' ]" :optionAnswers="[false, false, true, false, true]">
		<template #a>
			令 $f = a \sin t + b \cos t$，則
			$$
			\begin{split}
			D(a \sin t + b \cos t) &= \frac{d}{dt} (a \sin t + b \cos t) \\
			&= a \cos t - b \sin t \\
			&= - b \sin t + a \cos t
			\end{split}
			$$
			。將向量空間 $V$ 對應至 $\mathbb{R}^2$，定義線性算子
			$D': \mathbb{R}^2 \to \mathbb{R}^2$ 為
			$$
			D'\left( \begin{bmatrix} a \\ b \end{bmatrix} \right)
			= \begin{bmatrix} -b \\ a \end{bmatrix}
			$$
			可以發現矩陣 $A$ 滿足此線性算子：
			$$
			A \!\begin{bmatrix} a \\ b \end{bmatrix}
			= \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}
			\!\! \begin{bmatrix} a \\ b \end{bmatrix}
			= \begin{bmatrix} -b \\ a \end{bmatrix}
			$$
			<br>
			線性算子 $D$ 的特徵值與 $D', A$ 相同，因為它們只是基底不同而已。<br>
			矩陣 $A$ 的特徵值是 $\pm i$ 而非 $\pm 1$，因此選項 (a) 錯誤。
		</template>
		<template #b>
			$$
			F( 2 \!\begin{bmatrix} x \\ y \\ z \end{bmatrix}\! )
			= \!\begin{bmatrix} 2x + 1 \\ 2y + 2z \end{bmatrix}\!
			\neq 2 \!\begin{bmatrix} x + 1 \\ y + z \end{bmatrix}\!
			$$
			$F$ 的純量乘法並非線性，因此 $F$ 不是線性函數。
		</template>
		<template #c>
			$A \in F^{n \times n}$，因此 $A$ 的維度為 $n$。<br>
			由於 $E_{\lambda_1}$ 已佔去 $n-1$ 維，所以 $E_{\lambda_2}$
			的維度只能是 $1$。<br>
			可知 $A$ 總共有 $(n-1)+1 = n$ 個特徵向量 $\Rightarrow A$ 可對角化。
		</template>
		<template #d>
			題意：<br>
			<div class="ts-list is-unordered">
				<div class="item">
					對於某些編號 $i$，矩陣 $C$ 的列 $i$ 會等於
					$A$ 的列 $i$ 加上 $B$ 的列 $i$。
				</div>
				<div class="item">
					對於某些編號 $j \neq i$，$A, B, C$ 三個矩陣的列 $j$ 完全相同。
				</div>
			</div>
			<br>
			存在反例：
			$$
			\text{for some} ~ i = 1, 2 : ~~ \begin{vmatrix} 2 & 0 \\ 0 & 2 \end{vmatrix}
			\neq \begin{vmatrix} 1 & 0 \\ 0 & 1 \end{vmatrix} + \begin{vmatrix} 1 & 0 \\ 0 & 1 \end{vmatrix}
			$$
		</template>
		<template #e>
			因為 $T$ 可對角化，所以存在可逆方陣 $P$ 使 $P^{-1} T P = D$ ( 對角矩陣 )。<br>
			等式兩側開 $m$ 次方後：
			$$(P^{-1} T P)^m = P^{-1} T^m P = D^m$$
			由上式可知 $T^m$ 可對角化。
		</template>
	</MultiOption>
</template>
