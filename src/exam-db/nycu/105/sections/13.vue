<template>
	<MakeProblem listEndLabel="d" :listItemScoreTexts="['(2 points)', '(3 points)', '(5 points)', '(2 points)']">
		<template #problem>
			Solve the linear recurrence relation $a_n = 2a_{n-1} - a_{n-2} + 6n - 8$
			with $a_0 = 5$ and $a_1 = 10$ by the following steps.
		</template>
		<template #a>
			Find the characteristic equation of the associated homogeneous recurrence relation
			$a_n = 2a_{n-1} - a_{n-2}$.
		</template>
		<template #b>
			Find the solutions $a_n^{(h)}$ of the associated homogeneous recurrence relation.
		</template>
		<template #c>
			Find a particular solution $a_n^{(p)}$ of the nonhomogeneous recurrence relation
			$a_n = 2a_{n-1} - a_{n-2} + 6n - 8$.
		</template>
		<template #d>
			Use the initial condition $a_0 = 5$ and $a_1 = 10$ to find the solution.
		</template>
	</MakeProblem>
</template>
