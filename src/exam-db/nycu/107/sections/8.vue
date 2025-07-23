<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2' ]" useUlToListOptions>
			<template #1>
				Find the smallest equivalence relation on the set $\{a, b, c, d, e\}$
				containing the relation $\{(a, b), (a, c), (d, e)\}$.
			</template>
			<template #2>
				Identify the equivalent classes partitioned by this equivalent relation.
			</template>
		</MakeProblem>
	</vk>
</template>
