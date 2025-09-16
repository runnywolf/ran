<template>
	<MultiOption :optionNames="['A', 'B', 'C', 'D', 'E']" :optionAnswers="[true, true, false, false, true]">
		<template #A>
			將 $a_3 x^3 + a_2 x^2 + a_1 x + a_0$ 對應至列向量
			$\!\begin{bmatrix} a_3 & a_2 & a_1 & a_0 \end{bmatrix}\!$。<br>
			建構一個矩陣，使用高斯消去法轉為列梯矩陣：<br>
			$$
			\!\begin{bmatrix} -x^2 + 3x + 6 \\ x^3 + 2 \\ x^3 - 3x^2 + 5 \end{bmatrix}\!
			\sim \!\begin{bmatrix} 0 & -1 & 3 & 6 \\ 1 & 0 & 0 & 2 \\ 1 & -3 & 0 & 5 \end{bmatrix}\!
			$$
			$$
			\sim \!\begin{bmatrix} 1 & 0 & 0 & 2 \\ 0 & -1 & 3 & 6 \\ 1 & -3 & 0 & 5 \end{bmatrix}\!
			\sim \!\begin{bmatrix} 1 & 0 & 0 & 2 \\ 0 & -1 & 3 & 6 \\ 0 & -3 & 0 & 3 \end{bmatrix}\!
			\sim \!\begin{bmatrix} 1 & 0 & 0 & 2 \\ 0 & -1 & 3 & 6 \\ 0 & 0 & -9 & -15 \end{bmatrix}\!
			$$
			完成後的列梯矩陣沒有全為零的列，因此選項 (A) 的集合線性獨立。<br>
			(A) 正確
		</template>
		<template #B>
			將 $\!\begin{pmatrix} a & b \\ c & d \end{pmatrix}\!$ 對應至列向量
			$\!\begin{bmatrix} a & b & c & d \end{bmatrix}\!$。<br>
			建構一個矩陣，使用高斯消去法轉為列梯矩陣：<br>
			$$
			\left\{
			\!\begin{pmatrix} 0 & -1 \\ 1 & 1 \end{pmatrix}\!,
			\!\begin{pmatrix} -1 & 2 \\ 0 & 0 \end{pmatrix}\!,
			\!\begin{pmatrix} 2 & 1 \\ 0 & 0 \end{pmatrix}\!,
			\!\begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}\!
			\right\}
			\sim \!\begin{bmatrix} 0 & -1 & 1 & 1 \\ -1 & 2 & 0 & 0 \\ 2 & 1 & 0 & 0 \\ 1 & 0 & 1 & 0 \end{bmatrix}\!
			$$
			$$
			\sim \!\begin{bmatrix} -1 & 2 & 0 & 0 \\ 0 & -1 & 1 & 1 \\ 2 & 1 & 0 & 0 \\ 1 & 0 & 1 & 0 \end{bmatrix}\!
			\sim \!\begin{bmatrix} -1 & 2 & 0 & 0 \\ 0 & -1 & 1 & 1 \\ 0 & 5 & 0 & 0 \\ 0 & 2 & 1 & 0 \end{bmatrix}\!
			\sim \!\begin{bmatrix} -1 & 2 & 0 & 0 \\ 0 & -1 & 1 & 1 \\ 0 & 0 & 5 & 5 \\ 0 & 0 & 3 & 2 \end{bmatrix}\!
			$$
			$$
			\sim \!\begin{bmatrix} -1 & 2 & 0 & 0 \\ 0 & -1 & 1 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 3 & 2 \end{bmatrix}\!
			\sim \!\begin{bmatrix} -1 & 2 & 0 & 0 \\ 0 & -1 & 1 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & -1 \end{bmatrix}\!
			$$
			完成後的列梯矩陣沒有全為零的列，因此選項 (B) 的集合線性獨立。<br>
			(B) 正確
		</template>
		<template #C>
			令 $\{ v_1, v_2, v_3, v_4, v_5 \}$ 為選項 (C) 的集合。<br>
			明顯 $v_1 + v_2 + v_3 = v_4 + v_5$，因此選項 (C) 的集合線性相關。<br>
			(C) 錯誤
		</template>
		<template #D>
			令 $\{ v_1, v_2, v_3, v_4 \}$ 為選項 (D) 的集合。<br>
			明顯 $v_1 + v_2 = v_3$，因此選項 (D) 的集合線性相關。<br>
			(D) 錯誤
		</template>
		<template #E>
			將 $\!\begin{pmatrix} a \\ b \\ c \end{pmatrix}\!$ 對應至列向量
			$\!\begin{bmatrix} a & b & c \end{bmatrix}\!$。<br>
			建構一個矩陣，使用高斯消去法轉為列梯矩陣：<br>
			$$
			\left\{
			\!\begin{pmatrix} 1 \\ -1 \\ 3 \end{pmatrix}\!,
			\!\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}\!,
			\!\begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}\!
			\right\}
			\sim \!\begin{bmatrix} 1 & -1 & 3 \\ 1 & 2 & 3 \\ 1 & -2 & 1 \end{bmatrix}\!
			$$
			$$
			\sim \!\begin{bmatrix} 1 & -1 & 3 \\ 0 & 3 & 0 \\ 0 & -1 & -2 \end{bmatrix}\!
			\sim \!\begin{bmatrix} 1 & -1 & 3 \\ 0 & 1 & 0 \\ 0 & -1 & -2 \end{bmatrix}\!
			\sim \!\begin{bmatrix} 1 & -1 & 3 \\ 0 & 1 & 0 \\ 0 & 0 & -2 \end{bmatrix}\!
			$$
			完成後的列梯矩陣沒有全為零的列，因此選項 (E) 的集合線性獨立。<br>
			(E) 正確
		</template>
	</MultiOption>
</template>
