<template>
	等式兩邊同乘 <vl exp="A + 3I_n" />，使左側變成單位矩陣：
	<vl c exp="I_n = (aA + bI_n)(A + 3I_n)" />
	右側乘開後得到：
	<vl c exp="aA^2 + (3a + b) A + 3bI_n = I_n" />
	移項至左側：
	<vl c exp="aA^2 + (3a + b) A + (3b - 1)I_n = 0" />
	因為 <vl exp="A^2 + 4A + 6I_n = 0" />，減去 <vl exp="a" /> 倍，將 <vl exp="A^2" /> 項消去：
	<vl c exp="aA^2 + (3a + b) A + (3b - 1)I_n - a(A^2 + 4A + 6I_n) = 0" />
	化簡後得到：
	<vl c exp="(-a + b) A + (-6a + 3b - 1)I_n = 0" />
	接著解 <vl exp="a, b" /> 的聯立：
	<vl c exp="\begin{cases} -a + b = 0 \\ -6a + 3b - 1 = 0 \end{cases}" />
	得到
	<vl c exp="a = b = \frac{-1}{3}" />
	，因此
	<vl c exp="2a + b = -1" />
	Ans: (B)
</template>
