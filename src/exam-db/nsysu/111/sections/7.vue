<template>
	<MakeProblem scoreText="[10%]">
		<template #problem>
			If a first case of COVID‑19 is recorded in a country, let $p_n$ denote the probability
			that a least one case is reported during the $n\!$‑th week after the first recorded case in case
			that the percentage of the population that has received at least two doses of the COVID-19 vaccine achieves 70%.
			The country records provide evidence that $p_n = p_{n-1} - (0.3)p_{n-2}$, when $n \ge 2$.
			Since $p_0 = 0$ and $p_1 = 1$, if the first case (of a new outbreak) is recorded on December 27, 2019,
			when did the probability of the occurrence of a new case decrease to less than $0.01$ for the first time?
		</template>
	</MakeProblem>
</template>
