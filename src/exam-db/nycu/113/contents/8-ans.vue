<template>
	二次函數不一定能剛好覆蓋四個點。若將這四個點代入方程式：
	$$
	\left\{
	\begin{alignat*}{4}
	&C& ~&& ~&& &= 20 \\
	&C& ~+&D& ~+&E& &= 0 \\
	&C& ~+2&D& ~+4&E& &= 0 \\
	&C& ~+3&D& ~+9&E& &= 0
	\end{alignat*}
	\right.
	$$
	可以發現這是一個矛盾方程式 $Ax = b$：
	$$
	\begin{bmatrix} 1 & 0 & 0 \\ 1 & 1 & 1 \\ 1 & 2 & 4 \\ 1 & 3 & 9 \end{bmatrix}\!
	\!\begin{bmatrix} C \\ D \\ E \end{bmatrix}\! = \!\begin{bmatrix} 20 \\ 0 \\ 0 \\ 0 \end{bmatrix}
	$$
	若最小平方解為 $x'$，則平方誤差 $\| e \|^2 = \| Ax'-b \|^2$。<br>
	<br>
	先用高斯消去法解 $(A^T A) x' = A^T b$：
	$$
	\begin{bmatrix} 4 & 6 & 14 \\ 6 & 14 & 36 \\ 14 & 36 & 98 \end{bmatrix}\! x'
	= \!\begin{bmatrix} 20 \\ 0 \\ 0 \end{bmatrix}
	$$
	，得到
	$$ x' = \!\begin{bmatrix} 19 \\ -21 \\ 5 \end{bmatrix} ,~~ Ax' = \!\begin{bmatrix} 19 \\ 3 \\ -3 \\ 1 \end{bmatrix} $$
	，所以平方誤差為
	$$
	\| e \|^2 = \| Ax'-b \|^2 = \| \!\begin{bmatrix} -1 \\ 3 \\ -3 \\ 1 \end{bmatrix}\! \|^2
	= (-1)^2 + 3^2 + (-3)^2 + 1^2 = \boxed{20}
	$$
</template>
