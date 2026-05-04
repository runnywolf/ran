<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $a_n$ be the number of ways in which a line of $n$ people can be formed such that no two males
			are standing beside each other (each person is either $M$ or $F$). For example, $a_3 = 5$.
			Which of the following statements are correct?
		</template>
		<template #a>$a_n = a_{n-1} + a_{n-2}$ for $n \ge 3$, with $a_1 = 2$, $a_2 = 3$.</template>
		<template #b>$a_n = 2a_{n-1} - a_{n-2}$ for $n \ge 3$, with $a_1 = 2$, $a_2 = 3$.</template>
		<template #c>$a_n = a_{n-1} + a_{n-2}$ for $n \ge 3$, with $a_1 = 1$, $a_2 = 2$.</template>
		<template #d>$a_1 = 2$, $a_2 = 3$, $a_3 = 5$, $a_4 = 8$, $a_5 = 13$.</template>
		<template #e>$a_n = F_{n+2}$, where $F_1 = 1$, $F_2 = 1$ is the Fibonacci sequence.</template>
	</MakeProblem>
</template>
