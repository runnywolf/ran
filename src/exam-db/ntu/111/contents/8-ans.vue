<template>
	<vk>
		等式兩邊同乘 $A + 3I_n$，使左側變成單位矩陣：
		$$I_n = (aA + bI_n)(A + 3I_n)$$
		右側乘開後得到：
		$$aA^2 + (3a + b) A + 3bI_n = I_n$$
		移項至左側：
		$$aA^2 + (3a + b) A + (3b - 1)I_n = 0$$
		因為 $A^2 + 4A + 6I_n = 0$，減去 $a$ 倍，將 $A^2$ 項消去：
		$$aA^2 + (3a + b) A + (3b - 1)I_n - a(A^2 + 4A + 6I_n) = 0$$
		化簡後得到：
		$$(-a + b) A + (-6a + 3b - 1)I_n = 0$$
		接著解 $a, b$ 的聯立：
		$$\begin{cases} -a + b = 0 \\ -6a + 3b - 1 = 0 \end{cases}$$
		得到
		$$a = b = \frac{-1}{3}$$
		，因此
		$$2a + b = -1$$
		Ans: (B)
	</vk>
</template>
