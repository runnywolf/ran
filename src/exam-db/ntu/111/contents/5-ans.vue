<template>
	non‑symmetric relation 的定義：$\forall x, y \in A ~,~ (x, y) \in R \to (y, x) \notin R$<br>
	$\Rightarrow~ \forall x, y \in A ~,~ (x, y) \notin R ~\lor~ (y, x) \notin R$<br>
	$\Rightarrow~ \forall x \in A ~,~ (x, x) \notin R ~\lor~ (x, x) \notin R$<br>
	$\Rightarrow~ \forall x \in A ~,~ (x, x) \notin R$<br>
	<br>
	接著計算關係的排列組合數：<br>
	<div class="ts-list is-unordered">
		<div class="item">
			$x \neq y$ ( 關係矩陣的非對角線部分 )：<br>
			關係對 $\{ (x, y), (y, x) \}$ 的數量為關係矩陣上三角的元素數目 $m(m-1)/2$，<br>
			由於關係 $(x, y), (y, x)$ 不能同時存在，只能二擇一或都不選擇，因此每個關係對有 $3$ 種選法。<br>
			因為 $m(m-1)/2$ 個關係對的選擇互相獨立，所以排列數為
			$$3^{m(m-1)/2}$$
		</div>
		<div class="item">
			$x = y$ ( 關係矩陣的對角線部分 )：<br>
			因為 $\forall x \in A ~,~ (x, x) \notin R$，對應到關係矩陣就是對角線全為 $0$，所以只有 $1$ 種組合。
		</div>
	</div>
	<br>
	所以 $A$ 的 non‑symmetric relations 的數目為
	$$3^{(m^2-m)/2}$$
	Ans: (C)
</template>
