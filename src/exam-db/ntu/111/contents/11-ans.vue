<template>
	先將 $A$ 對角化：<br>
	$A$ 的特徵多項式為 $p_A(t) = \det(A - tI) = \begin{vmatrix} 2-t & 1 \\ 3 & 4-t \end{vmatrix}$，<br>
	注意到 $p_A(1) = \begin{vmatrix} 1 & 1 \\ 3 & 3 \end{vmatrix} = 0$，再根據
	$\text{tr}(\begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix}) = 1 + \lambda_2 = 6$
	得到另一個特徵值 $t = 5$。<br>
	<br>
	求特徵值 $1$ 對應的特徵向量 $x_1$：<br>
	$$
	(A - 1I)x_1 = \!\begin{bmatrix} 1 & 1 \\ 3 & 3 \end{bmatrix}\! x_1 = 0 ~~,~~
	\text{choose}~~ x_1 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}
	$$
	求特徵值 $5$ 對應的特徵向量 $x_2$：<br>
	$$
	(A - 5I)x_2 = \!\begin{bmatrix} -3 & 1 \\ 3 & -1 \end{bmatrix}\! x_2 = 0 ~~,~~
	\text{choose}~~ x_2 = \begin{bmatrix} 1 \\ 3 \end{bmatrix}
	$$
	$A$ 可對角化為：
	$$
	A = P \!\begin{bmatrix} 1 & 0 \\ 0 & 5 \end{bmatrix}\! P^{-1} ~~,~~
	P = \!\begin{bmatrix} 1 & 1 \\ -1 & 3 \end{bmatrix}\! ~~,~~
	P^{-1} = \tfrac{1}{4} \!\begin{bmatrix} 3 & -1 \\ 1 & 1 \end{bmatrix}
	$$
	<br>
	令 $B = P \!\begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix}\! P^{-1}$，使
	$$
	\begin{split}
	B^3 &= ( P { \begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix} } P^{-1} )^3 \\
	&= P { \begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix} }^3 P^{-1} \\
	&= P { \begin{bmatrix} 1^3 & 0 \\ 0 & (\sqrt[3]{5})^3 \end{bmatrix} } P^{-1} \\
	&= P { \begin{bmatrix} 1 & 0 \\ 0 & 5 \end{bmatrix} } P^{-1} \\
	&= A
	\end{split}
	$$
	。因此
	$$
	\begin{split}
	B &= P \!\begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix}\! P^{-1} \\
	&= \!\begin{bmatrix} 1 & 1 \\ -1 & 3 \end{bmatrix}\!
	\!\begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix}\!
	(\tfrac{1}{4} \!\begin{bmatrix} 3 & -1 \\ 1 & 1 \end{bmatrix}) \\
	&= \tfrac{1}{4} \!\begin{bmatrix}
	3 + \sqrt[3]{5} & -1 + \sqrt[3]{5} \, \\
	-3 + 3\sqrt[3]{5} & 1 + 3\sqrt[3]{5} \,
	\end{bmatrix}
	\end{split}
	$$
	Ans: (C)
</template>
