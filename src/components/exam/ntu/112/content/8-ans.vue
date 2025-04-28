<template>
	<OptionAnswer option="A" :answer="true">
		跡的定義：<vl exp="\text{tr}(A) = \sum\limits_{i=1}^n A_{ii}" /><br>
		根據
		<vl c exp="
			\begin{split}
				\text{tr}(A+B) &= \sum\limits_{i=1}^n (A+B)_{ii} \\
					&= \sum\limits_{i=1}^n (A_{ii} + B_{ii}) \\
					&= \sum\limits_{i=1}^n A_{ii} + \sum\limits_{i=1}^n B_{ii} \\
					&= \text{tr}(A) + \text{tr}(B)
			\end{split}
		" />
		分解選項 (A) 的式子：
		<vl c exp="
			\begin{split}
				\text{tr}((A+B)C) &= \text{tr}(AC+BC) \\
					&= \text{tr}(AC) + \text{tr}(BC)
			\end{split}
		" />
	</OptionAnswer>
	<div class="ts-divider is-section"></div>
	
	<OptionAnswer option="B" :answer="false">
		反例：
		<vl c exp="
			\left\{
			\begin{alignat*}{1}
				&\text{tr}(I_n I_n) = \text{tr}(I_n) = n \\
				&\text{tr}(I_n) \text{tr}(I_n) = n \cdot n = n^2
			\end{alignat*}
			\right.
		" />
		※ <vl exp="\det(AB) = \det(A) \det(B)" />
	</OptionAnswer>
	<div class="ts-divider is-section"></div>
	
	<OptionAnswer option="C" :answer="true">
		根據矩陣乘法的定義 <vl exp="(AB)_{ij} = \sum\limits_{k=1}^n A_{ik} B_{kj}" />：
		<vl c exp="
			\begin{split}
				\text{tr}(AB) &= \sum\limits_{i=1}^n (AB)_{ii} \\
					&= \sum\limits_{i=1}^n \sum\limits_{k=1}^n A_{ik} B_{ki} \\
					&= \sum\limits_{k=1}^n \sum\limits_{i=1}^n B_{ki} A_{ik} \\
					&= \sum\limits_{k=1}^n (BA)_{kk} \\
					&= \text{tr}(BA)
			\end{split}
		" />
	</OptionAnswer>
	<div class="ts-divider is-section"></div>
	
	<OptionAnswer option="D" :answer="true">
		求特徵多項式：
		<vl c exp="
			\begin{split}
				p(t) &= \!\begin{vmatrix} a-t & b+c \\ b-c & -a-t \end{vmatrix}\! \\
						&= -(a-t)(a+t) - (b-c)(b+c) \\
						&= -(a^2 - t^2) - (b^2 - c^2) \\
						&= t^2 - a^2 - b^2 + c^2
			\end{split}
		" />
		<vl exp="p(\lambda) = \lambda^2 - a^2 -b^2 + c^2 = 0" /><br>
		<vl exp="\Rightarrow ~ \lambda = \pm\sqrt{a^2 + b^2 - c^2}" /><br>
		<vl exp="\Rightarrow" /> 若 <vl exp="a^2 + b^2 - c^2 \ge 0" /> 則 <vl exp="\lambda" /> 為實數<br>
		<vl exp="\Rightarrow" /> 若 <vl exp="a^2 + b^2 \ge c^2" /> 則
		<vl exp="\!\begin{bmatrix} a & b+c \\ b-c & -a \end{bmatrix}\!" /> 有實數特徵值
	</OptionAnswer>
	<div class="ts-divider is-section"></div>
	
	<OptionAnswer option="E" :answer="false">
		由於 <vl exp="A^3 = I" />，<vl exp="A" /> 的特徵值 <vl exp="\lambda" /> 滿足 <vl exp="\lambda^3 = 1" />。<br>
		而 <vl exp="\lambda" /> 為複平面上的三次單位根：
		<vl c exp="
			\lambda \in \{ 1, \omega, \omega^2 \} ~,~
			\omega = e^{2 \pi i / 3} = \frac{-1 + \sqrt{3}}{2}
		" />
		存在反例 <vl exp="A = \!\begin{bmatrix} 1 & 0 \\ 0 & \omega \end{bmatrix}\!" />
		滿足 <vl exp="A \neq I" /> 和 <vl exp="A^3 = I" />，<br>
		但 <vl exp="\text{tr}(A) = 1 + \omega \neq 1" />。
	</OptionAnswer>
</template>
