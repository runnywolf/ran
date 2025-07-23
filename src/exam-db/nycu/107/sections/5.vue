<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2' ]" useUlToListOptions>
			<template #problem>
				Give a recursive definition of the sequence $\{a_n\} ,~ n = 1, 2, 3, \cdots$
			</template>
			<template #1>$a_n = 4n - 2$.</template>
			<template #2>$a_n = n(n + 1)$.</template>
		</MakeProblem>
	</vk>
</template>
