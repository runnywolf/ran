<template>
	先求 <vl exp="A" /> 的特徵值：<br>
	<vl exp="A" /> 的特徵多項式為
	<vl c exp="
		\begin{align*}
		p_A(t) &= \det(A - tI) \\
		&= \begin{vmatrix}
		2-t & 1 & -2 & 2 & 0 \\
		2 & 3-t & -4 & 2 & 5 \\
		1 & 1 & -1-t & 0 & 2 \\
		0 & 0 & 0 & 4-t & -1 \\
		0 & 0 & 0 & 2 & 1-t
		\end{vmatrix} \\
		&= \begin{vmatrix} 2-t & 1 & -2 \\ 2 & 3-t & -4 \\ 1 & 1 & -1-t \end{vmatrix}
		\begin{vmatrix} 4-t & -1 \\ 2 & 1-t \end{vmatrix} \\
		&= \det(B - tI) \det(C - tI) \\
		&= p_B(t) p_C(t) \\
		&= 0
		\end{align*}
	" />
	可以分別求左上 <vl exp="3 \times 3" /> 子矩陣 <vl exp="B" />
	的特徵值，和右下 <vl exp="2 \times 2" /> 子矩陣 <vl exp="C" /> 的特徵值。<br>
	<br>
	目視得知 <vl exp="\lambda = 1" /> 使子矩陣
	<vl exp="
		B - \lambda I = \!\begin{bmatrix} 1 & 1 & -2 \\ 2 & 2 & -4 \\ 1 & 1 & -2 \end{bmatrix}\!
		\quad;\quad \text{nullity}(B - \lambda I) = 2
	" /><br>
	<vl exp="\Rightarrow~ B" /> 有二重根特徵值 <vl exp="\lambda = 1, 1" /><br>
	<vl exp="\Rightarrow~ \text{tr}(B) = 1 + 1 + \lambda_3 = 4 ~~" /> ( 跡為特徵值之和 )<br>
	<vl exp="\Rightarrow~ \lambda_3 = 2" /><br>
	<vl exp="\Rightarrow~ \lambda(B) = \{ 1, 1, 2 \}" /><br>
	<br>
	目視得知 <vl exp="\lambda = 2" /> 使子矩陣
	<vl exp="
		C - \lambda I = \!\begin{bmatrix} 2 & -1 \\ 2 & -1 \end{bmatrix}\!
		\quad;\quad \text{nullity}(C - \lambda I) = 1
	" /><br>
	<vl exp="\Rightarrow~ C" /> 有特徵值 <vl exp="\lambda = 2" /><br>
	<vl exp="\Rightarrow~ \text{tr}(C) = 2 + \lambda_2 = 5 ~~" /> ( 跡為特徵值之和 )<br>
	<vl exp="\Rightarrow~ \lambda_2 = 3" /><br>
	<vl exp="\Rightarrow~ \lambda(C) = \{ 2, 3 \}" /><br>
	<br>
	<vl exp="A" /> 的特徵值 <vl exp="\lambda(A) = \lambda(B) \cup \lambda(C) = \{ 1, 1, 2, 2, 3 \}" />。<br>
	<br>
	因為 <vl exp="f(x)" /> 是多項式，所以 <vl exp="f(A)" /> 的特徵值為 <vl exp="f(\lambda(A))" />：<br>
	<vl c exp="\begin{cases} f(1) = 2 \\ f(2) = 1 \\ f(3) = -8 \end{cases}" />
	可知矩陣 <vl exp="f(A)" /> 的最大特徵值為 <vl exp="2" />。
</template>
