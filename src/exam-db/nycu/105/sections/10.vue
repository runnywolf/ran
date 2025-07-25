<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				In the following questions, just give the answer, do not give any explanation.
			</template>
			<template #a>
				<span class="problem-score">(5 points)</span>
				Find $11^{121} \bmod 13$.
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span>
				Find all solutions of the system of congruences $x \equiv 4 \pmod{6}$ and $x \equiv 13 \pmod{15}$.
			</template>
			<template #c>
				<span class="problem-score">(5 points)</span>
				Determine a rule for generating the terms of the sequence that begins $1, 3, 4, 8, 15, 27, 50, 92, \cdots$,
				and find the next three terms of the sequence.
			</template>
		</MakeProblem>
	</vk>
</template>
