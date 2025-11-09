<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Consider a predicate $P(i, j)$, where $i, j$ are elements from the same domain $S$.
			Suppose all following statements are true:
			$$
			\begin{gather*}
			\forall i,~ P(i, i); \\
			\forall i, j,~ (i \neq j),~ P(i, j) \to \lnot P(j, i); \\
			\forall i, j, k,~ \big( P(i, j) \land P(j, k) \big) \to P(i, k); \\
			\forall i, j,~ P(i, j) \lor P(j, i); \\
			\exists ! \, k,~ \forall i \neq k,~ P(k, i);
			\end{gather*}
			$$
			($\exists !$ means “exist one and only one”)<br>
			Which of the following options are correct?
		</template>
		<template #A>$p$ describes an equivalence relation.</template>
		<template #B>$p$ describes a partial order set.</template>
		<template #C>$p$ describes a total order relation.</template>
		<template #D>$p$ describes a lattice.</template>
		<template #E>$p$ describes a well order relation.</template>
	</MakeProblem>
</template>
