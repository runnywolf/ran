<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(10%)', '(10%)']">
		<template #problem>
			Let $m$ and $n$ be two positive integers, $m \le n$. Define $\dbinom{n}{m} = \dfrac{n!}{m!(n-m)!}$.
		</template>
		<template #a>
			Show that if $n$ is prime, then $n$ divides $\dbinom{n}{i}$ for every $i,~ 1 \le i \lt n$.
		</template>
		<template #b>
			Show that if $n$ is composite, then $n$ does not divide $\dbinom{n}{i}$ for some $i,~ 1 \le i \lt n$.
		</template>
	</MakeProblem>
</template>
