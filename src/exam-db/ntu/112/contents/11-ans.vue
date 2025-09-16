<template>
	<MultiOption :optionNames="['A', 'B', 'C', 'D', 'E']" :optionAnswers="[true, true, true, true, true]">
		<template #A>
			在有限維度內積空間 $V$ 中自伴算子 $T$ 為厄米特矩陣。<br>
			$T$ 可被譜分解。
		</template>
		<template #B>
			$T$ 全部的特徵空間 $E_i$ 是互相正交的，可直和出 $V$。
		</template>
		<template #C>
			<div class="ts-list is-unordered">
				<div class="item">
					$T_i$ 為正交投影算子，無論投影多少次都等於一次投影，因此 ${T_i}^m = T_i$。
				</div>
				<div class="item">
					當 $i \neq j$ 時，因為 $E_i \perp E_j$，所以 $T_i T_j = 0$。
				</div>
			</div>
			<br>
			根據選項 (A) 對 $T$ 譜分解，則：
			$$T^m = (\lambda_1 T_1 + \lambda_2 T_2 + \cdots + \lambda_k T_k)^m$$
			因為 $i \neq j$ 時 $T_i T_j = 0$，所以 $T^m$ 展開後除了
			${\lambda_i}^m {T_i}^m$ 項以外，其他均為 $0$，因此
			$$T^m = \sum\limits_{i=1}^{k} {\lambda_i}^m {T_i}^m = \sum\limits_{i=1}^{k} {\lambda_i}^m T_i$$
			<br>
			假設多項式 $g$ 為：
			$$g(x) = a_0 + a_1 x + a_2 x^2 + \cdots + a_m x^m$$
			則
			$$
			\begin{split}
			g(T) &= a_0 I + a_1 T + a_2 T^2 + \cdots + a_m T^m \\
			&= a_0 \sum\limits_{i=1}^{k} T_i +
			a_1 \sum\limits_{i=1}^{k} {\lambda_i} T_i +
			a_2 \sum\limits_{i=1}^{k} {\lambda_i}^2 T_i + \cdots +
			a_m \sum\limits_{i=1}^{k} {\lambda_i}^m T_i \\
			&= \sum\limits_{i=1}^{k} ( a_0 + a_1 \lambda_i + a_2 {\lambda_i}^2 + \cdots + a_m {\lambda_i}^m ) T_i \\
			&= \sum\limits_{i=1}^{k} g(\lambda_i) T_i \\
			&= g(\lambda_1) T_1 + g(\lambda_2) T_2 + \cdots + g(\lambda_k) T_k
			\end{split}
			$$
		</template>
		<template #D>
			在有限維度內積空間 $V$ 中自伴算子 $T$ 為厄米特矩陣。<br>
			參考<RanLink to="#/exam/ntu-112/10" newTab>第 10 題 (D)(1)</RanLink>，厄米特矩陣的特徵值為實數。<br>
			所以，自伴算子 $T$ 的特徵值均為實數。
		</template>
		<template #E>
			在有限維度內積空間 $V$ 中自伴算子 $T$ 為厄米特矩陣 $A$。<br>
			而厄米特矩陣 $A$ 必可么正對角化。
		</template>
	</MultiOption>
</template>
