<template>
	在有限維度內積空間 <vl exp="V" /> 中自伴算子 <vl exp="T" /> 為厄米特矩陣。<br>
	<vl exp="T" /> 可被譜分解。
	<div class="ts-wrap is-compact">
		<span>(A)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	<vl exp="T" /> 全部的特徵空間 <vl exp="E_i" /> 是互相正交的，可直和出 <vl exp="V" />。
	<div class="ts-wrap is-compact">
		<span>(B)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	<div class="ts-list is-unordered">
    <div class="item">
			<vl exp="T_i" /> 為正交投影算子，無論投影多少次都等於一次投影，因此 <vl exp="{T_i}^m = T_i" />。
		</div>
    <div class="item">
			當 <vl exp="i \neq j" /> 時，因為 <vl exp="E_i \perp E_j" />，所以 <vl exp="T_i T_j = 0" />。
		</div>
	</div>
	<br>
	根據選項 (A) 對 <vl exp="T" /> 譜分解，則：
	<vl c exp="T^m = (\lambda_1 T_1 + \lambda_2 T_2 + \cdots + \lambda_k T_k)^m" />
	因為 <vl exp="i \neq j" /> 時 <vl exp="T_i T_j = 0" />，所以 <vl exp="T^m" /> 展開後除了
	<vl exp="{\lambda_i}^m {T_i}^m" /> 項以外，其他均為 <vl exp="0" />，因此
	<vl c exp="T^m = \sum\limits_{i=1}^{k} {\lambda_i}^m {T_i}^m = \sum\limits_{i=1}^{k} {\lambda_i}^m T_i" />
	<br>
	假設多項式 <vl exp="g" /> 為：
	<vl c exp="g(x) = a_0 + a_1 x + a_2 x^2 + \cdots + a_m x^m" />
	則
	<vl c exp="
		\begin{split}
			g(T) &= a_0 + a_1 T + a_2 T^2 + \cdots + a_m T^m \\
					 &= a_0 + a_1 \sum\limits_{i=1}^{k} {\lambda_i} T_i +
					 		a_2 \sum\limits_{i=1}^{k} {\lambda_i}^2 T_i + \cdots +
							a_m \sum\limits_{i=1}^{k} {\lambda_i}^m T_i \\
					 &= \sum\limits_{i=1}^{k} ( a_0 + a_1 \lambda_i + a_2 {\lambda_i}^2 + \cdots + a_m {\lambda_i}^m ) T_i \\
					 &= \sum\limits_{i=1}^{k} g(\lambda_i) T_i \\
					 &= g(\lambda_1) T_1 + g(\lambda_2) T_2 + \cdots + g(\lambda_k) T_k
		\end{split}
	" />
	<div class="ts-wrap is-compact">
		<span>(C)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	在有限維度內積空間 <vl exp="V" /> 中自伴算子 <vl exp="T" /> 為厄米特矩陣。<br>
	參考第 10 題 (D)(1)，厄米特矩陣的特徵值為實數。<br>
	所以，自伴算子 <vl exp="T" /> 的特徵值均為實數。
	<div class="ts-wrap is-compact">
		<span>(D)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
	<div class="ts-divider is-section"></div>
	
	在有限維度內積空間 <vl exp="V" /> 中自伴算子 <vl exp="T" /> 為厄米特矩陣 <vl exp="A" />。<br>
	而厄米特矩陣 <vl exp="A" /> 必可么正對角化。
	<div class="ts-wrap is-compact">
		<span>(E)</span>
		<span class="ts-icon is-check-icon is-big option-true-color"></span>
	</div>
</template>
