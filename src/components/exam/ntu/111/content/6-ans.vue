<template>
	若 <vl exp="A, B" /> 相似，則存在 <vl exp="P" /> 滿足 <vl exp="A = P^{-1} B P" />。
	<div class="ts-divider" style="margin-top: 4px;"></div>
	<MultiOption :optionNames="[ '1', '2', '3', '4' ]" :optionAnswers="[ true, true, true, true ]">
		<template #1>
			<vl c exp="A^{-1} = ( P^{-1} B P )^{-1} = P^{-1} ( B^{-1} ) P" />
			<vl exp="\Rightarrow~ A^{-1}" /> 與 <vl exp="B^{-1}" /> 相似。
		</template>
		<template #2>
			<vl c exp="
				\begin{split}
				p_A(t) &= \det(A - tI) \\
				&= \det( P^{-1} B P - P^{-1} (tI) P ) \\
				&= \det( P^{-1} (B - tI) P ) \\
				&= \det(P^{-1}) \det(B - tI) \det(P) \\
				&= \det(P)^{-1} \det(P) \det(B - tI) \\
				&= \det(B - tI) \\
				&= p_B(t)
				\end{split}
			" />
			<vl exp="A" /> 與 <vl exp="B" /> 的特徵多項式相同，因此特徵值也必定相同。
		</template>
		<template #3>
			<vl exp="P" /> 為變換矩陣，<vl exp="A, B" /> 實際上是不同基底下的線性轉換。
		</template>
		<template #4>
			相似變換不改變矩陣的秩，根據 Rank-nullity theorem：
			<vl c exp="\text{nullity}(A) = n - \text{rk}(A)" />
			，因此 <vl exp="A, B" /> 的 nullity 相同。
		</template>
	</MultiOption>
	<div class="ts-divider"></div>
	Ans: (E)
</template>
