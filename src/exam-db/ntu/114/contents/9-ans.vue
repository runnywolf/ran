<template>
	<vk>
		$A$ 的所有特徵值的乘積 $= \det(A)$。<br>
		$$
		\det(A) = \begin{vmatrix}
		\vdots & \vdots & \vdots & \vdots & & \vdots & \vdots & \vdots & \vdots \\
		a^{n-3} & a^{n-4} & a^{n-5} & a^{n-6} & \cdots & 1 & a & a^2 & a^3 \\
		a^{n-2} & a^{n-3} & a^{n-4} & a^{n-5} & \cdots & a & 1 & a & a^2 \\
		a^{n-1} & a^{n-2} & a^{n-3} & a^{n-4} & \cdots & a^2 & a & 1 & a \\
		a^n & a^{n-1} & a^{n-2} & a^{n-3} & \cdots & a^3 & a^2 & a & 1
		\end{vmatrix}
		$$
		行列式其中一列的 $k$ 倍加進另一列，不影響行列式的值。<br>
		因此，將倒數第 2 列乘 $-a$ 倍加進倒數第 1 列：<br>
		$$
		= \begin{vmatrix}
		\vdots & \vdots & \vdots & \vdots & & \vdots & \vdots & \vdots & \vdots \\
		a^{n-3} & a^{n-4} & a^{n-5} & a^{n-6} & \cdots & 1 & a & a^2 & a^3 \\
		a^{n-2} & a^{n-3} & a^{n-4} & a^{n-5} & \cdots & a & 1 & a & a^2 \\
		a^{n-1} & a^{n-2} & a^{n-3} & a^{n-4} & \cdots & a^2 & a & 1 & a \\
		0 & 0 & 0 & 0 & \cdots & 0 & 0 & 0 & 1-a^2
		\end{vmatrix}
		$$
		將倒數第 3 列乘 $-a$ 倍加進倒數第 2 列：<br>
		$$
		= \begin{vmatrix}
		\vdots & \vdots & \vdots & \vdots & & \vdots & \vdots & \vdots & \vdots \\
		a^{n-3} & a^{n-4} & a^{n-5} & a^{n-6} & \cdots & 1 & a & a^2 & a^3 \\
		a^{n-2} & a^{n-3} & a^{n-4} & a^{n-5} & \cdots & a & 1 & a & a^2 \\
		0 & 0 & 0 & 0 & \cdots & 0 & 0 & 1-a^2 & * \\
		0 & 0 & 0 & 0 & \cdots & 0 & 0 & 0 & 1-a^2
		\end{vmatrix}
		$$
		將倒數第 4 列乘 $-a$ 倍加進倒數第 3 列：<br>
		$$
		= \begin{vmatrix}
		\vdots & \vdots & \vdots & \vdots & & \vdots & \vdots & \vdots & \vdots \\
		a^{n-3} & a^{n-4} & a^{n-5} & a^{n-6} & \cdots & 1 & a & a^2 & a^3 \\
		0 & 0 & 0 & 0 & \cdots & 0 & 1-a^2 & * & * \\
		0 & 0 & 0 & 0 & \cdots & 0 & 0 & 1-a^2 & * \\
		0 & 0 & 0 & 0 & \cdots & 0 & 0 & 0 & 1-a^2
		\end{vmatrix}
		$$
		重複以上操作，直到行列式的下三角全為 $0$：<br>
		$$
		= \begin{vmatrix}
		1 & a & a^2 & a^3 & \cdots & a^n \\
		0 & 1-a^2 & * & * & \cdots & * \\
		0 & 0 & 1-a^2 & * & \cdots & * \\
		0 & 0 & 0 & 1-a^2 & & \vdots \\
		\vdots & \vdots & \vdots & & \ddots & * \\
		0 & 0 & 0 & \cdots & 0 & 1-a^2
		\end{vmatrix}
		$$
		此時的 $\det(A)$ 為對角線元素的乘積，因為這是一個 $n+1$ 階行列式，所以<br>
		$$\det(A) = 1 \cdot (1-a^2)^n$$
		因此 $A$ 的所有特徵值的乘積為<br>
		$$\boxed{ (1-a^2)^n }$$
	</vk>
</template>
