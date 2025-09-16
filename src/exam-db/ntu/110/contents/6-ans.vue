<template>
	<MultiOption :optionNames="[ 'a', 'b' ]">
		<template #a>
			子空間相加，維度不可能變小：
			$$6 = \max\{ \dim{U} , \dim{V} \} \le \dim(U + V)$$
			$U, V$ 是 $W$ 的子空間，所以 $U + V$ 的維度不可能超過 $W$：
			$$\dim(U + V) \le \dim{W} = 8$$
			因此
			$$6 \le \dim(U + V) \le 8$$
			<br>
			根據子空間維度加法公式 $\dim(U + V) = \dim(U) + \dim(V) - \dim(U \cap V)$，可知
			$$6 \le 12 - \dim(U \cap V) \le 8$$
			，移項後得到
			$$4 \le \dim(U \cap V) \le 6$$
			<br>
			若 $\dim(U \cap V) = 6$，則 $U = V$，違反題意，因此
			$\dim(U \cap V)$ 可能為 $4 ~\text{or}~ 5$。
		</template>
		<template #b>
			改變基底並不會影響線性變換 $T$ 的秩，因此將向量空間 $V$
			對應至 $\mathbb{R}^3$、將 $P_2(\mathbb{R})$ 對應至 $\mathbb{R}^3$，<br>
			定義線性變換 $T': \mathbb{R}^3 \to \mathbb{R}^3$ 為
			$$
				T'\left( \begin{bmatrix} a \\ b \\ c \end{bmatrix} \right)
				= \begin{bmatrix} a-b \\ b-c \\ c-a \end{bmatrix}
			$$
			可以發現矩陣 $A$ 滿足此線性變換：
			$$
				A \!\begin{bmatrix} a \\ b \\ c \end{bmatrix}
				= \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ -1 & 0 & 1 \end{bmatrix}
				\!\! \begin{bmatrix} a \\ b \\ c \end{bmatrix}
				= \begin{bmatrix} a-b \\ b-c \\ c-a \end{bmatrix}
			$$
			用矩陣列運算將 $A$ 化簡為列梯矩陣，用於確定秩：
			$$
				A = \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ -1 & 0 & 1 \end{bmatrix}
				\sim \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ 0 & 0 & 0 \end{bmatrix}
				\quad \implies \quad \text{rk}(A) = 2
			$$
			所以
			$$\text{rank}(T) = \text{rank}(T') = \text{rank}(A) = \boxed{2}$$
		</template>
	</MultiOption>
</template>
