<template>
	若將矩陣 <vl exp="A" /> 代入 <vl exp="A" /> 的最小多項式，會得到零矩陣：
	<vl c exp="m(A) = A^r + a_{r-1} A^{r-1} + \cdots + a_1 A + a_0 I = 0" />
	將等式兩側同乘 <vl exp="A^{-1}" />，並化簡：
	<vl c exp="(A^r + a_{r-1} A^{r-1} + \cdots + a_2 A^2 + a_1 A + a_0 I) A^{-1} = 0" />
	<vl c exp="A^r A^{-1} + a_{r-1} A^{r-1} A^{-1} + \cdots + a_2 A^2 A^{-1} + a_1 A A^{-1} + a_0 A^{-1} = 0" />
	<vl c exp="A^{r-1} + a_{r-1} A^{r-2} + \cdots + a_2 A + a_1 I + a_0 A^{-1} = 0" />
	可知
	<vl c exp="-a_0 A^{-1} = A^{r-1} + a_{r-1} A^{r-2} + \cdots + a_2 A + a_1 I" />
	，把等式兩側同除 <vl exp="-a_0" /> 後得到：
	<vl c exp="A^{-1} = \boxed{ -\frac{1}{a_0} (A^{r-1} + a_{r-1} A^{r-2} + \cdots + a_2 A + a_1 I) }" />
</template>
