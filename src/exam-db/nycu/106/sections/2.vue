<template>
	<vk>
		<MakeProblem scoreText="(10 points)" :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Assume $n = 2^k,~ k \in \mathbb{N}$.
				The straightforward way to multiply two $n \times n$ matrices takes time $O(n^3)$.
			</template>
			<template #a>
				<span class="problem-score">(5 points)</span>
				Please describe an asymptotically faster multiplication method.
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span>
				Use the recurrence relation to analyze the time complexity of your method.
			</template>
		</MakeProblem>
	</vk>
</template>
