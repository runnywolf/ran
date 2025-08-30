<template>
	<vk>
		分別對分塊矩陣 $[4]$ 和 $\begin{bmatrix} 1 & i \\ -i & 1 \end{bmatrix}$ 做么正對角化，其中
		$[4] = [1][4]{[1]}^H$。<br>
		因為
		$$
		\text{tr}(\begin{bmatrix} 1 & i \\ -i & 1 \end{bmatrix}) = \lambda_1 + \lambda_2 = 2 \\
		\det(\begin{bmatrix} 1 & i \\ -i & 1 \end{bmatrix}) = \lambda_1 \lambda_2 = 0
		$$
		，所以 $\lambda_1 = 0 ,~ \lambda_2 = 2$。<br>
		<br>
		求特徵值 $\lambda_1 = 0$ 對應的特徵向量 $x_1$：
		$$
		(A - 0 I) x_1 = \!\begin{bmatrix} 1 & i \\ -i & 1 \end{bmatrix}\! x_1 = 0 ~~,~~
		\text{choose}~~ x_1 = \!\begin{bmatrix} 1 \\ i \end{bmatrix}
		$$
		求特徵值 $\lambda_2 = 2$ 對應的特徵向量 $x_2$：
		$$
		(A - 2 I) x_2 = \!\begin{bmatrix} -1 & i \\ -i & -1 \end{bmatrix}\! x_2 = 0 ~~,~~
		\text{choose}~~ x_2 = \!\begin{bmatrix} 1 \\ -i \end{bmatrix}
		$$
		厄米特矩陣的相異特徵值對應的特徵向量天然正交，因此可以省略正交化。<br>
		由於么正矩陣 $U$ 必須由單範化的行組成，使 $U^H U = I$，所以： ( ex: 複數域向量的範數記得取共軛。)
		$$
		\begin{cases}
		u_1 = \dfrac{1}{\| x_1 \|} x_1 = \dfrac{1}{\sqrt{1 \cdot 1 + i (-i)}} x_1
		= \dfrac{1}{\sqrt{2}} \begin{bmatrix} 1 \\ i \end{bmatrix} \\
		u_2 = \dfrac{1}{\| x_2 \|} x_2 = \dfrac{1}{\sqrt{1 \cdot 1 + (-i) i}} x_2
		= \dfrac{1}{\sqrt{2}} \begin{bmatrix} 1 \\ -i \end{bmatrix}
		\rule{0em}{2em}
		\end{cases}
		$$
		$$
		\def\arraystretch{1.3}
		U = [u_1~~u_2] = \!\begin{bmatrix}
		\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ \frac{i}{\sqrt{2}} & \frac{-i}{\sqrt{2}}
		\end{bmatrix}\!
		$$
		
		
		
		因此
		$$
		\!\begin{bmatrix} 1 & i \\ -i & 1 \end{bmatrix}\!
		= \def\arraystretch{1.35} \!\begin{bmatrix}
		\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ \frac{i}{\sqrt{2}} & \frac{-i}{\sqrt{2}}
		\end{bmatrix}\!
		\def\arraystretch{1} \!\begin{bmatrix} 0 & 0 \\ 0 & 2 \end{bmatrix}\! U^H
		$$
		<br>
		將兩個分塊矩陣的結果合併為矩陣 $D$ 的么正對角化：
		$$
		\begin{split}
		D &= P \Lambda P^H
		= \def\arraystretch{1.3} \!\begin{bmatrix}
		1 & & \\ & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ & \frac{i}{\sqrt{2}} & \frac{-i}{\sqrt{2}}
		\end{bmatrix}\!
		\def\arraystretch{1} \!\begin{bmatrix} 4 & & \\ & 0 & \\ & & 2 \end{bmatrix}\! P^H \\
		&= P \Lambda^{1/2} \Lambda^{1/2} P^H \\
		&= P \Lambda^{1/2} (\Lambda^{1/2})^H P^H \\
		&= P \Lambda^{1/2} (P \Lambda^{1/2})^H \\
		&= F^H F ~~,~~ F = (P \Lambda^{1/2})^H
		\end{split}
		$$
		$$
		\begin{split}
		F &= (P \Lambda^{1/2})^H \\
		&= ( \def\arraystretch{1.3} \!\begin{bmatrix}
		1 & & \\ & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ & \frac{i}{\sqrt{2}} & \frac{-i}{\sqrt{2}}
		\end{bmatrix}\!
		\def\arraystretch{1} \!\begin{bmatrix} 4^{1/2} & & \\ & 0^{1/2} & \\ & & 2^{1/2} \end{bmatrix}\! )^H \\
		&= { \!\begin{bmatrix} 2 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & -i \end{bmatrix}\! }^H \\
		&= \boxed{ \!\begin{bmatrix} 2 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 1 & i \end{bmatrix}\! }
		\end{split}
		$$
	</vk>
</template>
