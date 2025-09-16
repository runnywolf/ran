<template>
	因為 $ABA = A$，所以 $B \in \mathbb{R}^{5 \times 4}$。<br>
	令 $[b_1 ~~ b_2 ~~ b_3 ~~ b_4] = B ,~~ b_i \in \mathbb{R}^5$，可以發現
	$$
	A = ABA = A(BA)^T = A A^T B^T
	= \!\begin{bmatrix} 1/4 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 1/2 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}\!
	\!\begin{bmatrix} {b_1}^T \\ {b_2}^T \\ {b_3}^T \\ {b_4}^T \end{bmatrix}\!
	= \!\begin{bmatrix} 1/4 \cdot {b_1}^T \\ 0 \\ 1/2 \cdot {b_3}^T \\ {b_4}^T \end{bmatrix}\!
	$$
	，因此
	$$
	\begin{cases}
	{b_1}^T = [0 ~~ {-2} ~~ 0 ~~ 0 ~~ 0] \\
	{b_3}^T = [1 ~~ 0 ~~ 0 ~~ 0 ~~ {-1}] \\
	{b_4}^T = [0 ~~ 0 ~~ 0 ~~ {-1} ~~ 0]
	\end{cases}
	$$
	，令
	$$
	B = [b_1 ~~ b_2 ~~ b_3 ~~ b_4]
	= \!\begin{bmatrix} 0 & a & 1 & 0 \\ -2 & b & 0 & 0 \\ 0 & c & 0 & 0 \\ 0 & d & 0 & -1 \\ 0 & e & -1 & 0 \end{bmatrix}
	$$
	。<br>
	<br>
	$AB$ 是對稱矩陣，
	$$
	AB = (AB)^T
	= \!\begin{bmatrix}
	1 & \frac{-1}{2} b & 0 & 0 \\
	0 & 0 & 0 & 0 \\
	0 & \frac{1}{2} a + \frac{-1}{2} e & 1 & 0 \\
	0 & -d & 0 & 1
	\end{bmatrix}
	$$
	$$ \implies \begin{cases} \frac{-1}{2} b = 0 \\ \frac{1}{2} a + \frac{-1}{2} e = 0 \\ -d = 0 \end{cases} $$
	$$ \implies~ b = d = 0 ,~~ a = e $$
	$$
	\implies~ B =
	\!\begin{bmatrix} 0 & a & 1 & 0 \\ -2 & 0 & 0 & 0 \\ 0 & c & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 0 & a & -1 & 0 \end{bmatrix}
	$$
	最後得到
	$$
	\begin{split}
	B &= BAB = (BA)^T B = A^T B^T B \\
	&= \!\begin{bmatrix} 0 & 0 & 1/2 & 0 \\ -1/2 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 0 & 0 & -1/2 & 0 \end{bmatrix}\!
	\!\begin{bmatrix} 4 & 0 & 0 & 0 \\ 0 & 2a^2+c^2 & 0 & 0 \\ 0 & 0 & 2 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}\! \\
	&= \!\begin{bmatrix} 0 & 0 & 1 & 0 \\ -2 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 0 & 0 & -1 & 0 \end{bmatrix}
	\end{split}
	$$
	矩陣 $B$ 之中，$-2, -1, 0, 1, 2$ 的個數分別為
	$$\boxed{1, 2, 16, 1, 0}$$
</template>
