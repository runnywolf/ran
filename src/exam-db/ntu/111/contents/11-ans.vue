<template>
	先將 <vl exp="A" /> 對角化：<br>
	<vl exp="A" /> 的特徵多項式為
	<vl exp="p_A(t) = \det(A - tI) = \begin{vmatrix} 2-t & 1 \\ 3 & 4-t \end{vmatrix}" />，<br>
	注意到 <vl exp="p_A(1) = \begin{vmatrix} 1 & 1 \\ 3 & 3 \end{vmatrix} = 0" />，再根據
	<vl exp="\text{tr}(\begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix}) = 1 + \lambda_2 = 6" />
	得到另一個特徵值 <vl exp="t = 5" />。<br>
	<br>
	求特徵值 <vl exp="1" /> 對應的特徵向量 <vl exp="x_1" />：<br>
	<vl c exp="
		(A - 1I)x_1 = \!\begin{bmatrix} 1 & 1 \\ 3 & 3 \end{bmatrix}\! x_1 = 0 ~~,~~
		\text{choose}~~ x_1 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}
	" />
	求特徵值 <vl exp="5" /> 對應的特徵向量 <vl exp="x_2" />：<br>
	<vl c exp="
		(A - 5I)x_2 = \!\begin{bmatrix} -3 & 1 \\ 3 & -1 \end{bmatrix}\! x_2 = 0 ~~,~~
		\text{choose}~~ x_2 = \begin{bmatrix} 1 \\ 3 \end{bmatrix}
	" />
	<vl exp="A" /> 可對角化為：
	<vl c exp="
		A = P \!\begin{bmatrix} 1 & 0 \\ 0 & 5 \end{bmatrix}\! P^{-1} ~~,~~
		P = \!\begin{bmatrix} 1 & 1 \\ -1 & 3 \end{bmatrix}\! ~~,~~
		P^{-1} = \tfrac{1}{4} \!\begin{bmatrix} 3 & -1 \\ 1 & 1 \end{bmatrix}
	" />
	<br>
	令 <vl exp="B = P \!\begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix}\! P^{-1}" />，使
	<vl c exp="
		\begin{split}
		B^3 &= ( P { \begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix} } P^{-1} )^3 \\
		&= P { \begin{bmatrix} 1 & 0 \\ 0 & \sqrt[3]{5} \end{bmatrix} }^3 P^{-1} \\
		&= P { \begin{bmatrix} 1^3 & 0 \\ 0 & (\sqrt[3]{5})^3 \end{bmatrix} } P^{-1} \\
		&= P { \begin{bmatrix} 1 & 0 \\ 0 & 5 \end{bmatrix} } P^{-1} \\
		&= A
		\end{split}
	" />
	。因此
	<vl c exp="
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
	" />
	Ans: (C)
</template>
