<template>
	$A$ 的特徵多項式為：
	$$
	p_A(t) = \det(A - tI)
	= \begin{vmatrix} 9-t & -1 & 5 & 7 \\ 8 & 3-t & 2 & -4 \\ 0 & 0 & 3-t & 6 \\ 0 & 0 & -1 & 8-t \end{vmatrix}
	$$
	用行列式的分塊定理，化簡 $p_A(t)$：
	$$
	= \begin{vmatrix} 9-t & -1 \\ 8 & 3-t \end{vmatrix} \cdot \begin{vmatrix} 3-t & 6 \\ -1 & 8-t \end{vmatrix}
	$$
	<br>
	<div class="ts-list is-unordered">
		<div class="item">
			注意到 $t = 5$ 代入到左側行列式，得到 $\begin{vmatrix} 4 & -1 \\ 8 & -2 \end{vmatrix} = 0$，<br>
			再根據 $\text{tr}(\begin{bmatrix} 9 & -1 \\ 8 & 3 \end{bmatrix}) = 5 + \lambda_2 = 12$，得到另一個特徵值 $t = 7$。
		</div>
		<div class="item">
			注意到 $t = 5$ 代入到右側行列式，得到 $\begin{vmatrix} -2 & 6 \\ -1 & 3 \end{vmatrix} = 0$，<br>
			再根據 $\text{tr}(\begin{bmatrix} 3 & 6 \\ -1 & 8 \end{bmatrix}) = 5 + \lambda_2 = 11$，得到另一個特徵值 $t = 6$。
		</div>
	</div>
	<br>
	因此 $A$ 的特徵值為 $\{ 5, 5, 6, 7 \}$，最大的特徵值為 $7$。<br>
	Ans: (B)
</template>
