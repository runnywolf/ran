<template>
	先求 $A$ 的特徵值：<br>
	$A$ 的特徵多項式為
	$$
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
	$$
	可以分別求左上 $3 \times 3$ 子矩陣 $B$ 的特徵值，和右下 $2 \times 2$ 子矩陣 $C$ 的特徵值。<br>
	<br>
	目視得知 $\lambda = 1$ 使子矩陣
	$
	B - \lambda I = \!\begin{bmatrix} 1 & 1 & -2 \\ 2 & 2 & -4 \\ 1 & 1 & -2 \end{bmatrix}\!
	\quad;\quad \text{nullity}(B - \lambda I) = 2
	$<br>
	$\Rightarrow~ B$ 有二重根特徵值 $\lambda = 1, 1$<br>
	$\Rightarrow~ \text{tr}(B) = 1 + 1 + \lambda_3 = 4 ~~$ ( 跡為特徵值之和 )<br>
	$\Rightarrow~ \lambda_3 = 2$<br>
	$\Rightarrow~ \lambda(B) = \{ 1, 1, 2 \}$<br>
	<br>
	目視得知 $\lambda = 2$ 使子矩陣
	$
	C - \lambda I = \!\begin{bmatrix} 2 & -1 \\ 2 & -1 \end{bmatrix}\!
	\quad;\quad \text{nullity}(C - \lambda I) = 1
	$<br>
	$\Rightarrow~ C$ 有特徵值 $\lambda = 2$<br>
	$\Rightarrow~ \text{tr}(C) = 2 + \lambda_2 = 5 ~~$ ( 跡為特徵值之和 )<br>
	$\Rightarrow~ \lambda_2 = 3$<br>
	$\Rightarrow~ \lambda(C) = \{ 2, 3 \}$<br>
	<br>
	$A$ 的特徵值 $\lambda(A) = \lambda(B) \cup \lambda(C) = \{ 1, 1, 2, 2, 3 \}$。<br>
	<br>
	因為 $f(x)$ 是多項式，所以 $f(A)$ 的特徵值為 $f(\lambda(A))$：<br>
	$$\begin{cases} f(1) = 2 \\ f(2) = 1 \\ f(3) = -8 \end{cases}$$
	可知矩陣 $f(A)$ 的最大特徵值為 $2$。
</template>
