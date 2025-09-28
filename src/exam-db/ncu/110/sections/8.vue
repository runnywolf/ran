<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			The number of ways to buy $n$ dollars of tickets is represented by $a_n$,
			if only 1‑dollar and 2‑dollar bills can be used.
			What of the following can be the recurrence relation for our question?
			(initial condition: $a_0 = 1 ,~ a_1 = 1$)
		</template>
		<template #A>$a_n = a_{n-1} + 1$.</template>
		<template #B>$a_n = a_{n-2} + 3$.</template>
		<template #C>$a_n = 2a_{n-2} + 1$.</template>
		<template #D>$a_n = a_{n-1} + a_{n-2}$.</template>
		<template #E>None of the above.</template>
	</MakeProblem>
</template>
