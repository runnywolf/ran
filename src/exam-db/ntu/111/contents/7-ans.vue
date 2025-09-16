<template>
	<div class="ts-divider" style="margin-top: 4px;"></div>
	<MultiOption :optionNames="[ '1', '2', '3', '4' ]" :optionAnswers="[ true, true, false, true ]">
		<template #1>
			如果 $A$ 為正交矩陣，滿足 $A^T = A^{-1}$。<br>
			則
			$$(A^{-1})^T = (A^T)^T = A = (A^{-1})^{-1}$$
			，因此 $A^{-1}$ 為正交矩陣。
		</template>
		<template #2>
			如果 $A, B$ 為正交矩陣，滿足 $A^T = A^{-1} ~,~ B^T = B^{-1}$。<br>
			則
			$$(AB)^T = B^T A^T = B^{-1} A^{-1} = (AB)^{-1}$$
			，因此 $AB$ 為正交矩陣。
		</template>
		<template #3>
			正交歸一行組成的矩陣 $Q$ 滿足
			$Q^T Q = I ~,~ Q \in \mathbb{R}^{n \times m} ~,~ n \ge m$。<br>
			因為 $Q$ 不一定是方陣，所以不一定可逆。
		</template>
		<template #4>
			$A + iB$ 為么正矩陣，滿足 $(A + iB)^H (A + iB) = I$。<br>
			因為 $A, B$ 為實方陣，所以
			$$(A + iB)^H (A + iB) = (A - iB)^T (A + iB)$$
			，展開後得到：
			$$A^T A + B^T B + i(A^T B - B^T A) = I$$
			<br>
			因為 $I$ 為實方陣，所以虛部 $A^T B - B^T A = 0$，因此
			$$A^T B = B^T A = (A^T B)^T$$
			，得知 $A^T B$ 為對稱矩陣。
		</template>
	</MultiOption>
	<div class="ts-divider"></div>
	Ans: (D)
</template>
