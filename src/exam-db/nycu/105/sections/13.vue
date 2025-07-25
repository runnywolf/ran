<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
			<template #problem>
				Solve the linear recurrence relation $a_n = 2a_{n-1} - a_{n-2} + 6n - 8$
				with $a_0 = 5$ and $a_1 = 10$ by the following steps.
			</template>
			<template #a>
				<span class="problem-score">(2 points)</span>
				Find the characteristic equation of the associated homogeneous recurrence relation
				$a_n = 2a_{n-1} - a_{n-2}$.
			</template>
			<template #b>
				<span class="problem-score">(3 points)</span>
				Find the solutions $a_n^{(h)}$ of the associated homogeneous recurrence relation.
			</template>
			<template #c>
				<span class="problem-score">(5 points)</span>
				Find a particular solution $a_n^{(p)}$ of the nonhomogeneous recurrence relation
				$a_n = 2a_{n-1} - a_{n-2} + 6n - 8$.
			</template>
			<template #d>
				<span class="problem-score">(2 points)</span>
				Use the initial condition $a_0 = 5$ and $a_1 = 10$ to find the solution.
			</template>
		</MakeProblem>
	</vk>
</template>
