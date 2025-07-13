<template>
	<vk>
		若將矩陣 $A$ 代入 $A$ 的最小多項式，會得到零矩陣：
		$$m(A) = A^r + a_{r-1} A^{r-1} + \cdots + a_1 A + a_0 I = 0$$
		將等式兩側同乘 $A^{-1}$，並化簡：
		$$(A^r + a_{r-1} A^{r-1} + \cdots + a_2 A^2 + a_1 A + a_0 I) A^{-1} = 0$$
		$$A^r A^{-1} + a_{r-1} A^{r-1} A^{-1} + \cdots + a_2 A^2 A^{-1} + a_1 A A^{-1} + a_0 A^{-1} = 0$$
		$$A^{r-1} + a_{r-1} A^{r-2} + \cdots + a_2 A + a_1 I + a_0 A^{-1} = 0$$
		可知
		$$-a_0 A^{-1} = A^{r-1} + a_{r-1} A^{r-2} + \cdots + a_2 A + a_1 I$$
		，把等式兩側同除 $-a_0$ 後得到：
		$$A^{-1} = \boxed{ -\frac{1}{a_0} (A^{r-1} + a_{r-1} A^{r-2} + \cdots + a_2 A + a_1 I) }$$
	</vk>
</template>
