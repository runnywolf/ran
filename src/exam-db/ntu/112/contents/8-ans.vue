<template>
	<MultiOption :optionNames="['A', 'B', 'C', 'D', 'E']" :optionAnswers="[true, false, true, true, false]">
		<template #A>
			跡的定義：$\text{tr}(A) = \sum\limits_{i=1}^n A_{ii}$<br>
			根據
			$$
			\begin{split}
			\text{tr}(A+B) &= \sum\limits_{i=1}^n (A+B)_{ii} \\
			&= \sum\limits_{i=1}^n (A_{ii} + B_{ii}) \\
			&= \sum\limits_{i=1}^n A_{ii} + \sum\limits_{i=1}^n B_{ii} \\
			&= \text{tr}(A) + \text{tr}(B)
			\end{split}
			$$
			分解選項 (A) 的式子：
			$$
			\begin{split}
			\text{tr}((A+B)C) &= \text{tr}(AC+BC) \\
			&= \text{tr}(AC) + \text{tr}(BC)
			\end{split}
			$$
		</template>
		<template #B>
			反例：
			$$
			\left\{
			\begin{alignat*}{1}
			&\text{tr}(I_n I_n) = \text{tr}(I_n) = n \\
			&\text{tr}(I_n) \text{tr}(I_n) = n \cdot n = n^2
			\end{alignat*}
			\right.
			$$
			※ $\det(AB) = \det(A) \det(B)$
		</template>
		<template #C>
			根據矩陣乘法的定義 $(AB)_{ij} = \sum\limits_{k=1}^n A_{ik} B_{kj}$：
			$$
			\begin{split}
			\text{tr}(AB) &= \sum\limits_{i=1}^n (AB)_{ii} \\
			&= \sum\limits_{i=1}^n \sum\limits_{k=1}^n A_{ik} B_{ki} \\
			&= \sum\limits_{k=1}^n \sum\limits_{i=1}^n B_{ki} A_{ik} \\
			&= \sum\limits_{k=1}^n (BA)_{kk} \\
			&= \text{tr}(BA)
			\end{split}
			$$
		</template>
		<template #D>
			求特徵多項式：
			$$
			\begin{split}
			p(t) &= \!\begin{vmatrix} a-t & b+c \\ b-c & -a-t \end{vmatrix}\! \\
			&= -(a-t)(a+t) - (b-c)(b+c) \\
			&= -(a^2 - t^2) - (b^2 - c^2) \\
			&= t^2 - a^2 - b^2 + c^2
			\end{split}
			$$
			$p(\lambda) = \lambda^2 - a^2 -b^2 + c^2 = 0$<br>
			$\Rightarrow ~ \lambda = \pm\sqrt{a^2 + b^2 - c^2}$<br>
			$\Rightarrow$ 若 $a^2 + b^2 - c^2 \ge 0$ 則 $\lambda$ 為實數<br>
			$\Rightarrow$ 若 $a^2 + b^2 \ge c^2$ 則 $\!\begin{bmatrix} a & b+c \\ b-c & -a \end{bmatrix}\!$ 有實數特徵值
		</template>
		<template #E>
			由於 $A^3 = I$，$A$ 的特徵值 $\lambda$ 滿足 $\lambda^3 = 1$。<br>
			而 $\lambda$ 為複平面上的三次單位根：
			$$ \lambda \in \{ 1, \omega, \omega^2 \} ~,~ \omega = e^{2 \pi i / 3} = \frac{-1 + \sqrt{3}}{2} $$
			存在反例 $A = \!\begin{bmatrix} 1 & 0 \\ 0 & \omega \end{bmatrix}\!$ 滿足 $A \neq I$ 和 $A^3 = I$，<br>
			但 $\text{tr}(A) = 1 + \omega \neq 1$。
		</template>
	</MultiOption>
</template>
