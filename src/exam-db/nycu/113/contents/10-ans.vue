<template>
	<MultiOption :optionNames="['a', 'b', 'c']">
		<template #a>
			上三角矩陣的特徵值為對角線元素，即 $\boxed{1, 2, 3}$。
		</template>
		<template #b>
			求特徵值 $\lambda_1 = 1$ 對應的特徵向量 $x_1$：
			$$
			(A - \lambda_1 I) x_1 = \!\begin{bmatrix} 0 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{bmatrix}\! x_1 = 0 ~~,~~
			\text{choose}~~ x_1 = \!\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}
			$$
			求特徵值 $\lambda_2 = 2$ 對應的特徵向量 $x_2$：
			$$
			(A - \lambda_2 I) x_2 = \!\begin{bmatrix} -1 & 1 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 1 \end{bmatrix}\! x_2 = 0 ~~,~~
			\text{choose}~~ x_2 = \!\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}
			$$
			求特徵值 $\lambda_3 = 3$ 對應的特徵向量 $x_3$：
			$$
			(A - \lambda_3 I) x_3 = \!\begin{bmatrix} -2 & 1 & 1 \\ 0 & -1 & 1 \\ 0 & 0 & 0 \end{bmatrix}\! x_3 = 0 ~~,~~
			\text{choose}~~ x_3 = \!\begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}
			$$
		</template>
		<template #c>
			先分析矩陣 $\begin{bmatrix} 2 & 2 \\ 1 & 3 \end{bmatrix}$ 的特徵值和特徵向量。<br>
			矩陣的每一列總和都是 $4$，因此一定有特徵值 $4$ 和特徵向量 $\begin{bmatrix} 1 \\ 1 \end{bmatrix}$ 使
			$$
			\begin{bmatrix} 2 & 2 \\ 1 & 3 \end{bmatrix}\! \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}\!
			= 4 \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}
			$$
			。因為特徵值總和為 $\text{tr}(A) = 5$，所以另一個特徵值是 $1$：
			$$
			(A - 1I) x = \!\begin{bmatrix} 1 & 2 \\ 1 & 2 \end{bmatrix}\! x = 0 ~~,~~
			\text{choose}~~ x = \!\begin{bmatrix} 2 \\ -1 \end{bmatrix}
			$$
			<br>
			令 $\lambda_i$ 為題 (b) 的第 $i$ 個特徵值，令 $x_i$ 為第 $i$ 個特徵向量。<br>
			注意到
			$$
			B \!\begin{bmatrix} 1 x_i \\ 1 x_i \end{bmatrix}\!
			= \begin{bmatrix} 2A & 2A \\ A & 3A \end{bmatrix}\! \!\begin{bmatrix} 1 x_i \\ 1 x_i \end{bmatrix}\!
			= \!\begin{bmatrix} 2 A x_i + 2 A x_i \\ 1 A x_i + 3 A x_i \end{bmatrix}\!
			= \!\begin{bmatrix} 4 A x_i \\ 4 A x_i \end{bmatrix}\!
			= \!\begin{bmatrix} 4 \lambda_i x_i \\ 4 \lambda_i x_i \end{bmatrix}\!
			= 4 \lambda_i \!\begin{bmatrix} 1 x_i \\ 1 x_i \end{bmatrix}\!
			$$
			，同理
			$$
			B \!\begin{bmatrix} 2 x_i \\ -1 x_i \end{bmatrix}\!
			= 1 \lambda_i \!\begin{bmatrix} 2 x_i \\ -1 x_i \end{bmatrix}\!
			$$
			，所以 $B$ 的特徵值為 $\{ 1 \lambda_i ~,~ 4 \lambda_i \} ,~ \lambda_i = \{ 1, 2, 3 \}$，分別為
			$\boxed{ 1, 2, 3, 4, 8, 12 }$。
		</template>
	</MultiOption>
</template>
