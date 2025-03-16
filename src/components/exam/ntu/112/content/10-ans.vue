<template>
	(1) 證明 <vl exp="N(A) \sube N(A^T A)" />：<br>
	假設 <vl exp="x \in N(A)" /><br>
	<vl exp="\Rightarrow ~ Ax = 0" /><br>
	<vl exp="\Rightarrow ~ A^T (Ax) = A^T 0" /><br>
	<vl exp="\Rightarrow ~ (A^T A)x = 0" /><br>
	<vl exp="\Rightarrow ~ x \in N(A^T A)" /><br>
	因此 <vl exp="N(A) \sube N(A^T A)" /><br>
	<br>
	(2) 證明 <vl exp="N(A^T A) \sube N(A)" />：<br>
	假設 <vl exp="x \in N(A^T A)" /><br>
	<vl exp="\Rightarrow ~ (A^T A)x = 0" /><br>
	<vl exp="\Rightarrow ~ x^T A^T A x = x^T 0" /><br>
	<vl exp="\Rightarrow ~ (Ax)^T (Ax) = {\| Ax \|}^2 = 0" /><br>
	<vl exp="\Rightarrow ~ {\| Ax \|} = 0" /><br>
	<vl exp="\Rightarrow ~ Ax = 0" /><br>
	<vl exp="\Rightarrow ~ x \in N(A)" /><br>
	因此 <vl exp="N(A^T A) \sube N(A)" /><br>
	<br>
	由於已證明 <vl exp="N(A) \sube N(A^T A)" /> 且 <vl exp="N(A^T A) \sube N(A)" />，<br>
	根據集合定義得出： <vl exp="N(A^T A) = N(A)" />
	<div class="ts-wrap is-compact">
		<span>(A)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	正交矩陣 <vl exp="A" /> 的特徵值 <vl exp="\lambda(A) = \{ -1, 1 \}" /><br>
	<vl exp="A + \frac{1}{2} I" /> 的特徵值為 <vl exp="\lambda(A) + \frac{1}{2}" />：
	<vl c exp="\lambda(A + \frac{1}{2}) = \{ \frac{-1}{2} , \frac{3}{2} \}" />
	可知 <vl exp="A + \frac{1}{2} I" /> 的特徵值 <vl exp="\neq 0" />，<br>
	而行列式為所有特徵值之乘積，因此
	<vl exp="\text{det}(A + \frac{1}{2}I) \neq 0" />。<br>
	<vl exp="\Rightarrow ~ A + \frac{1}{2} I" /> 可逆。<br>
	<div class="ts-wrap is-compact">
		<span>(B)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	<vl exp="A" /> 的特徵值小於 <vl exp="n" /> 個<br>
	<vl exp="\Rightarrow" /> 特徵多項式的某個特徵值 <vl exp="\lambda_i" />
	有重根 ( 代數重數 <vl exp="k_i \gt 1" />)<br>
	<br>
	如果所有的特徵值 <vl exp="\lambda_i" /> 都可以對應到 <vl exp="k_i" /> 個特徵向量 ( 代數重數 = 幾何重數 )，<br>
	即 <vl exp="\forall \lambda_i ~,~ \text{dim}[ N(A - \lambda_i I) ] = k_i" />，則 <vl exp="A" />
	可對角化。
	<div class="ts-wrap is-compact">
		<span>(C)</span>
		<span class="ts-icon is-xmark-icon is-big option-false-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	(1) 若 <vl exp="A" /> 為實對稱矩陣，則特徵值為實數：<br>
	假設 <vl exp="A" /> 的特徵值 <vl exp="\lambda \in \Complex" /> 對應到特徵向量
	<vl exp="x \in \Complex^n" />，根據特徵值的定義 <vl exp="Ax = \lambda x" />，則<br>
	<vl c exp="\langle Ax, x \rangle = \langle \lambda x, x \rangle = \lambda \langle x, x \rangle" />
	換個方向
	<div class="ts-list is-unordered">
    <div class="item">
			在複數域下 <vl exp="\langle Ax, x \rangle = \langle x, A^H x \rangle" />
		</div>
    <div class="item">
			<vl exp="A" /> 為實對稱矩陣，取共軛值不變，所以 <vl exp="A^H = A" />
		</div>
	</div>
	所以
	<vl c exp="
		\langle Ax, x \rangle = \langle x, A^H x \rangle = \langle x, Ax \rangle
			= \langle x, \lambda x \rangle = \overline{\lambda} \langle x, x \rangle
	" />
	<br>
	根據上面兩個等式，得知
	<vl exp="\langle Ax, x \rangle = \lambda \langle x, x \rangle = \overline{\lambda} \langle x, x \rangle" />
	<br>
	移項後得到：
	<vl c exp="(\lambda - \overline{\lambda}) \langle x, x \rangle = 0" />
	<br>
	<vl exp="x" /> 為特徵向量<br>
	<vl exp="\Rightarrow ~ x \neq 0" /><br>
	<vl exp="\Rightarrow ~ \langle x, x \rangle \neq 0" /><br>
	<vl exp="\Rightarrow ~ (\lambda - \overline{\lambda})" /> 必須為 <vl exp="0" /> 才能使上面的等式成立<br>
	<vl exp="\Rightarrow ~ \lambda = \overline{\lambda}" /><br>
	<vl exp="\Rightarrow ~ \lambda" /> 取共軛後值不變，代表 <vl exp="\lambda \in \R" /><br>
	<br>
	(2) 若 <vl exp="A" /> 為實對稱矩陣，則特徵向量兩兩正交：<br>
	不一定，重根特徵值對應的特徵空間內的兩個特徵向量不一定正交。<br>
	<br>
	<div class="ts-wrap is-compact">
		<span>(D)</span>
		<span class="ts-icon is-xmark-icon is-big option-false-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	根據定義，正定矩陣一定要滿足 <vl exp="A^H = A" />，也就是厄米特矩陣。<br>
	在這個條件下，<vl exp="A" /> 必可么正對角化：
	<vl c exp="A = V D V^{-1}" />
	取 <vl exp="U = V D^{1/2} V^{-1}" />，則
	<vl c exp="
		\begin{split}
			U^2 &= V D^{1/2} V^{-1} V D^{1/2} V^{-1} \\
					&= V D^{1/2} D^{1/2} V^{-1} \\
					&= V D V^{-1} \\
					&= A
		\end{split}
	" />
	接下來以行列式檢查 <vl exp="U" /> 是否為非奇異矩陣：
	<vl c exp="
		\begin{split}
			\text{det}(U) &= \text{det}(V D^{1/2} V^{-1}) \\
										&= \text{det}(V) \text{det}(D^{1/2}) \text{det}(V^{-1}) \\
										&= \text{det}(V) \text{det}(D^{1/2}) \text{det}(V)^{-1} \\
										&= \text{det}(D^{1/2})
		\end{split}
	" />
	其中對角矩陣 <vl exp="D" /> 的對角線元素為 <vl exp="A" /> 的特徵值：
	<vl c exp="\text{det}(D^{1/2}) = {\lambda_1}^{1/2} {\lambda_2}^{1/2} \cdots {\lambda_n}^{1/2}" />
	若 <vl exp="A" /> 為正定矩陣<br>
	<vl exp="\Rightarrow" /> 特徵值 <vl exp="\lambda_i \neq 0" /><br>
	<vl exp="\Rightarrow ~ \text{det}(D^{1/2}) \neq 0" /><br>
	<vl exp="\Rightarrow ~ \text{det}(U) \neq 0" /><br>
	<vl exp="\Rightarrow ~ U" /> 為非奇異矩陣<br>
	<br>
	綜上所述，若 <vl exp="A" /> 正定，則存在非奇異矩陣 <vl exp="U = V D^{1/2} V^{-1}" /> 滿足 <vl exp="A = U^2" />。
	<div class="ts-wrap is-compact">
		<span>(E)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
</template>
