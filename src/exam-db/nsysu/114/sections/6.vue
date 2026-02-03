<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #a>
			Find and solve a recurrence relation for the number of ways to perform two programs P1 and P2
			sequentially for $n$ seconds if each process of P1 requires one second and P2 needs four seconds.
		</template>
		<template #b>
			Find and solve a recurrence relation for the number of ways to perform two programs P1 and P2
			for $n$ seconds if each process of P1 requires one second and P2 needs four seconds,
			where the process of P2 for four different tasks and each P2 process with a different task
			is considered as a different process.
		</template>
	</MakeProblem>
</template>
