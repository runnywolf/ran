<template>
	<vk>
		(a) No<br>
		反身性 (reflexive)：$\forall x \in A,~ (x, x) \in R$<br>
		$(a, a) \notin R$，因此關係 $R$ 不具反身性。<br>
		<br>
		(b) No<br>
		對稱性 (symmetric)：$\forall x, y \in A,~ (x, y) \in R \to (y, x) \in R$<br>
		$(a, b) \in R,~ (b, a) \notin R$，因此關係 $R$ 不具對稱性。<br>
		<br>
		(c) No<br>
		遞移性 (transitive)：$\forall x, y, z \in A,~ (x, y) \in R \land (y, z) \in R \to (x, z) \in R$<br>
		$(a, b) \in R,~ (b, c) \in R,~ (a, c) \notin R$，因此關係 $R$ 不具遞移性。<br>
		<br>
		(d)<br>
		偏序關係 (partial order) 需要滿足：
		<div class="ts-list is-unordered">
			<div class="item">反身性 (reflexive)</div>
			<div class="item">反對稱性 (asymmetric)：$\forall x, y \in A,~ (x, y) \in R \land (y, x) \in R \to x = y$</div>
			<div class="item">遞移性 (transitive)</div>
		</div>
		關係 $R$ 並不滿足反身性和遞移性。<br>
		<br>
		要使 $R$ 具有偏序關係，需要先加入一些元素使 $R$ 滿足反身性。<br>
		加入 $(a, a), \cdots\!, (e, e)$ ( 5 個 )。<br>
		<br>
		因為 $(a, b), (b, c), (c, d), (d, e) \in R$，加入 $(a, c), (b, d), (c, e)$ 滿足遞移性。<br>
		因為 $(a, b), (b, d), (b, c), (c, e) \in R$，加入 $(a, d), (b, e)$ 滿足遞移性，共 5 個。<br>
		<br>
		檢查後發現 $R$ 恰滿足偏序關係，可知最少需要將 $\boxed{10}$ 個 pair 加入至 $R$ 使它具有偏序關係。
	</vk>
</template>
