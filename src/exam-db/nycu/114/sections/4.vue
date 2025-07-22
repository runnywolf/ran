<template>
	<vk>
		<MakeProblem scoreText="(7 points)" :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
			<template #problem>
				Consider the set $A = \{a, b, c, d, e\}$ and the relation $R$ on $A$ defined as follows:
				$R = \{(a, b), (b, c), (c, d), (d, e), (a, e)\}$.
			</template>
			<template #a>
				<span class="problem-score">(1 point)</span>
				Is $R$ reflexive?
			</template>
			<template #b>
				<span class="problem-score">(1 point)</span>
				Is $R$ symmetric?
			</template>
			<template #c>
				<span class="problem-score">(1 point)</span>
				Is $R$ transitive?
			</template>
			<template #d>
				<span class="problem-score">(4 points)</span>
				Does $R$ define a partial ordering? If not, what is the minimal number of
				ordered pairs that must be added to $R$ to make it a partial order?
			</template>
		</MakeProblem>
	</vk>
</template>
