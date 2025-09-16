<template>
	<MultiOption :optionNames="[ 'a', 'b' ]">
		<template #a>
			<div class="ts-wrap is-vertical">
				<div>
					1. (True)<br>
					集合 $R$ 是定義域 $D$ 中，所有使謂詞 $P(x)$ 為真的元素所構成的集合。<br>
					因為 $R$ 是 $D$ 之中選出來的，所以 $R \sube D$，因此 $|R| \le |D|$。
				</div>
				<div>
					2. (True)<br>
					$\forall x \in D,~ P(x) \to Q(x)$<br>
					$\Rightarrow~ \forall x \in D,~ x \in R \to x \in S$<br>
					$\Rightarrow~ R \sube S$
				</div>
				<div>
					3. (False)<br>
					$R \cap S = \varnothing$ 並不能保證 $R \cup S = D$，因為有可能有元素都不在 $R, S$ 內。<br>
					若存在元素都不在 $R$ 和 $S$ 內，則 $P(x) = \text{F},~ Q(x) = \text{F}$，<br>
					$P(x) \lor Q(x) = \text{F} \lor \text{F} = \text{F} \neq \text{T}$，這個陳述有可能錯誤。
				</div>
				<div>
					4. (False)<br>
					$R \sube S \Rightarrow |R| \le |S|$，但逆命題 $|R| \le |S| \nRightarrow R \sube S$ 不一定成立。<br>
					只有當 $R \sube S$ 成立時，這個陳述才是對的：<br>
					$\Rightarrow~ \forall x \in D,~ x \in R \to x \in S$<br>
					$\Rightarrow~ \forall x \in D,~ P(x) \to Q(x)$
				</div>
				<div>
					5. (True)<br>
					$R \sube S$<br>
					$\Rightarrow~ \forall x \in D,~ x \in R \to x \in S$<br>
					$\Rightarrow~ \forall x \in D,~ P(x) \to Q(x)$<br>
					$\Rightarrow~ \forall x \in D,~ \lnot P(x) \lor Q(x)$
				</div>
				<div>
					陳述 (1)(2)(5) 是恆真的。
				</div>
			</div>
		</template>
		<template #b>
			定義集合 $A$ 為可數無限集合 $\{a_1, a_2, \cdots\}$。<br>
			定義集合 $B$ 為可數無限集合 $\{b_1, b_2, \cdots\}$，並且 $A, B$ 沒有交集。<br>
			利用排容原理：
			$$ | A \cup B | = |A| + |B| - | A \cap B | = |A| + |B| = \aleph_0 + \aleph_0 $$
			接著嘗試把集合 $A \cup B$ 的元素映射到 $\mathbb{N}$，以確定 $A \cup B$ 為可數無限集合。<br>
			若將集合 $A \cup B$ 的元素 $a_n$ 映射到 $2n-1$，$b_n$ 映射到 $2n$，則每個元素都有對應到
			$\mathbb{N}$ 內的一個編號，說明 $A \cup B$ 是可數無限集合，大小為 $\aleph_0$。<br>
			可知兩個可數無限集合合併後仍然是可數無限集合：
			$$ \aleph_0 + \aleph_0 = \aleph_0 $$
		</template>
	</MultiOption>
</template>

<style scoped>
.fs {
	font-size: 16px;
}
</style>
