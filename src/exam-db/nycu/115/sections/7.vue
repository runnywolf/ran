<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(3 points)', '(3 points)', '(4 points)']">
		<template #problem>
			For $n \ge 0$, let $\{x_n\}, \{y_n\}, \{z_n\}$ be sequences defined by the initial conditions
			$x_0 = 1,~ y_0 = 0,~ z_0 = 0$. For $n \ge 1$, they satisfy $x_n = x_{n-1} + y_{n-1} + z_{n-1}$,
			$y_n = x_{n-1} + z_{n-1}$, and $z_n = y_{n-1}$. You must show all necessary steps.
			<span class="ran-bold problem-score">Answers without justification will receive no points.</span>
		</template>
		<template #a>
			Let $u_n = x_n + y_n + z_n$. Use mathematical induction to prove that $u_n = 2^n$ for all $n \ge 0$.
		</template>
		<template #b>
			Using the result from part (a), derive a recurrence relation for $y_n$ in terms of $y_{n-1}$
			and show that $y_n = 2^{n-1} - y_{n-1}$ for all $n \ge 1$.
		</template>
		<template #c>
			Solve the recurrence in part (b) to obtain a closed‑form expression for $y_n$,
			and verify that your formula satisfies the initial condition.
		</template>
	</MakeProblem>
</template>
