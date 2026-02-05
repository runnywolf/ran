<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(4 points)', '(4 points)']">
		<template #problem>
			Define relations $R$ and $S$ on $\mathbb{N} = \{ 0, 1, 2, \cdots \}$ by
			(1) $xRy$ if and only if $x \equiv y \pmod{7}$, and
			(2) $xSy$ if and only if $x \equiv y \pmod{13}$.
			For each of the following relations on $\mathbb{N}$, determine whether it is an equivalence relation.
			If it is, give a proof. If it is not, explain which property of an equivalence relation fails.
			In each case, justify your answer.
			<span class="ran-bold problem-score">Answers without justification will receive no points.</span>
		</template>
		<template #a>$R \cap S$</template>
		<template #b>$R \cup S$</template>
	</MakeProblem>
</template>
