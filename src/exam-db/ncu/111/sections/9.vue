<template>
	<MakeProblem listEndLabel="E">
		<template #problem>Concerning the binomial coefficient $\binom{r}{k}$, what following formula are true?</template>
		<template #A>$\binom{r}{k} = \frac{r}{k}\binom{r-1}{k-1}$, for any integer $k \neq 0$.</template>
		<template #B>$\sum\limits_{k=0}^{n} \binom{n}{k}(-1)^k = 0$, for any integer $n \geq 0$.</template>
		<template #C>$\sum\limits_{k=0}^{n} \binom{k}{m} = \binom{n+1}{m+1}$, for any integer $m, n \geq 0$.</template>
		<template #D>$\sum\limits_{k=0}^{n} \binom{r+k}{k} = \binom{r+n+1}{n}$, for any integer $n$.</template>
		<template #E>$\binom{r}{k} = \binom{r-1}{k-1} + \binom{r}{k-1}$, for any integer $k$.</template>
	</MakeProblem>
</template>
