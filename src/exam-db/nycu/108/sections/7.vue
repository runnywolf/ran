<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Determine whether each of the following conditional statements is a tautology or not.
				If yes, provide a proof. If no, provide a counter example.
			</template>
			<template #a>
				<span class="problem-score">(3 points)&nbsp;</span> $p \to (\neg q \lor r)$
			</template>
			<template #b>
				<span class="problem-score">(3 points)&nbsp;</span> $\neg p \to (q \to r)$
			</template>
			<template #c>
				<span class="problem-score">(3 points)&nbsp;</span> $(p \to q) \lor (\neg p \to r)$
			</template>
		</MakeProblem>
	</vk>
</template>
