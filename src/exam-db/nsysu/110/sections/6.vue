<template>
	<MakeProblem scoreText="[10%]">
		<template #problem>
			Solve the recurrence relation
			$$ a_{n+2} - 4a_{n+1} + 3a_n = -360 ,~~ n \ge 0 ,~~ a_0 = 3000 ,~~ a_1 = 3300. $$
		</template>
	</MakeProblem>
</template>
<!-- [fix problem error] "a_0 = 3300" -> "a_1 = 3300" -->
