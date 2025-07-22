<template>
	<MakeProblem scoreText="(12 points)" :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
		<template #problem>
			Assigning 8 distinct tasks to 3 identical servers,
			where every task must be assigned to exactly one server.
		</template>
		<template #a>
			<span class="problem-score">(4 points)</span>
			Suppose each server can handle any number of tasks, including none.
			How many ways can the 8 tasks be assigned to the 3 servers with no restrictions?
		</template>
		<template #b>
			<span class="problem-score">(2 points)</span>
			Suppose that each server must handle at least one task.
			How many ways can the tasks be assigned?
		</template>
		<template #c>
			<span class="problem-score">(2 points)</span>
			Suppose that each server must handle at least one task,
			and no server can handle 5 tasks or more, how many valid task assignments are possible?
		</template>
		<template #d>
			<span class="problem-score">(4 points)</span>
			Now, consider that the servers are labeled (i.e., no longer identical),
			and each server must handle at least one task. Additionally,
			no server can handle 5 tasks or more. How many valid task assignments are there in this case?
		</template>
	</MakeProblem>
</template>
