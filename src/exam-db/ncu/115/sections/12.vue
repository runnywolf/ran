<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Suppose $x$ and $y$ are integer numbers, and we define the following predicates:
			$$ \begin{gather*}
			D(x, y)\!: y \text{ is a multiple of } x \\
			C_3(x, y)\!: x \text{ is congruent to } y \text{ modulo } 3 \\
			C_6(x, y)\!: x \text{ is congruent to } y \text{ modulo } 6
			\end{gather*} $$
			Which of the following clauses are correct interpretations of the logical statement:
			$$ \forall x, y ,~ ( C_3(x, y) \land \neg C_6(x, y) \land D(6, x) ) \to \neg D(x, y) $$
		</template>
		<template #a>
			If $y$ is a multiple of $y$, it is not possible that $x$ is a multiple of 6,
			and $x$ is congruent to $y$ modulo 3, but not congruent to $y$ modulo 6.
		</template>
		<template #b>
			For $y$ to be a multiple of $x$, $x$ and $y$ cannot both congruent
			modulo 6 and modulo 3 and still $x$ is a multiple of 6.
		</template>
		<template #c>
			It is possible that $x$ is a multiple of 6 and $y$ is a multiple of $x$,
			where $x$ is congruent to $y$ modulo 3 but not congruent to $y$ modulo 6.
		</template>
		<template #d>
			If $x$ is congruent to $y$ modulo 3 but not congruent to $y$ modulo 6,
			and $x$ is a multiple of 6, then $y$ cannot be a multiple of $x$.
		</template>
		<template #e>
			None of the above.
		</template>
	</MakeProblem>
</template>
<!-- [fix problem error] 原本的 logical statement 的括號是怎樣, 不成對欸 -->
 