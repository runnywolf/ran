<template>
	<MakeProblem scoreText="(14 points)" listEndLabel="b" :listItemScoreTexts="['(4 points)', '(10 points)']">
		<template #a>
			Given a domain $D$ and two predicates $P$ and $Q$,
			let $R$ be the truth set of $P(x)$ and $S$ be the truth set of $Q(x)$.
			Pick up all the following statements that are always true?<br>
			<span class="fs">➀</span>$|R| \leq |D|$.<br>
			<span class="fs">➁</span>If $\forall x \in D,~ P(x) \to Q(x)$, then $R \subseteq S$.<br>
			<span class="fs">➂</span>If $R \cap S = \varnothing$, then $P(x) \lor Q(x) = \text{T}$.<br>
			<span class="fs">➃</span>If $|R| \leq |S|$, then $\forall x \in D,~ P(x) \to Q(x)$.<br>
			<span class="fs">➄</span>If $R \subseteq S$, then $\forall x \in D,~ \lnot P(x) \lor Q(x)$.<br>
		</template>
		<template #b>
			Let $\aleph_0$ denote the cardinality of a countable infinite set.
			Name two infinite sets and use the inclusion‑exclusion principle to show that $\aleph_0 + \aleph_0 = \aleph_0$
			(Disregard whether the principle holds for infinite sets)
		</template>
	</MakeProblem>
</template>

<style scoped>
.fs {
	font-size: 24px;
	margin-right: 8px;
	vertical-align: -3px;
}
</style>
