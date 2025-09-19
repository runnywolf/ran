<template>
	<vk>
		這四個條件恰好是實數<RanLink to="https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse#Definition">偽逆矩陣</RanLink>
		<span>的定義：$B = A^+$。</span><br>
		由於 $A$ 的行列都不滿秩，只能對 $A$ 做 SVD 分解：
		$$
		A = U \Sigma V^T
		= \!\begin{bmatrix} 0 & 0 & -1 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & -1 & 0 & 0 \\ -1 & 0 & 0 & 0 \end{bmatrix}\!
		\!\begin{bmatrix}
		1 & 0 & 0 & 0 & 0 \\
		0 & \frac{\sqrt{2}}{2} & 0 & 0 & 0 \\
		0 & 0 & \frac{1}{2} & 0 & 0 \\
		0 & 0 & 0 & 0 & 0
		\end{bmatrix}\!
		{ \!\begin{bmatrix}
		0 & \frac{-\sqrt{2}}{2} & 0 & 0 & \frac{\sqrt{2}}{2} \\
		0 & 0 & 1 & 0 & 0 \\
		0 & 0 & 0 & 1 & 0 \\
		1 & 0 & 0 & 0 & 0 \\
		0 & \frac{\sqrt{2}}{2} & 0 & 0 & \frac{\sqrt{2}}{2}
		\end{bmatrix}\! }^T
		$$
		$$
		B = A^+ = U \Sigma^+ V^T
		= \!\begin{bmatrix} 0 & 0 & 1 & 0 \\ -2 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 0 & 0 & -1 & 0 \end{bmatrix}
		$$
		矩陣 $B$ 之中，$-2, -1, 0, 1, 2$ 的個數分別為
		$$\boxed{1, 2, 16, 1, 0}$$
		注意：這個方法因為需要做 SVD 分解，非常耗時，留到最後再做。
	</vk>
</template>
