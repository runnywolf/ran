<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Consider a predicate $P(i, j)$, where $i, j$ are elements from the same domain $S$.
			Suppose all following statements are true:
			$$
			\begin{gather*}
			\forall i,~ p(i, i); \\
			\forall i, j,~ (i \neq j),~ p(i, j) \to \lnot p(j, i); \\
			\forall i, j, k,~ \big( p(i, j) \land p(j, k) \big) \to p(i, k); \\
			\forall i, j,~ p(i, j) \lor p(j, i); \\
			\exists ! \, k,~ \forall i \neq k,~ p(k, i);
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
