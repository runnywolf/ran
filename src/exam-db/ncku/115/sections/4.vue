<template>
	<MakeProblem scoreText="(10%)">
		<template #problem>
			Consider the recurrence: $E_n = 4E_{n-1} - 4E_{n-2} + 2^n + 3^n$, with initial values, $E_0 = 2,~ E_1 = 10$.
			Estimate the <span class="ran-bold">smallest </span>$n$ such that $E_n \gt 10^9$.
		</template>
	</MakeProblem>
</template>
