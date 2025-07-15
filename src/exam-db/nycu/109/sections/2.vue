<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Give a recursive definition of the sequence $\{a_n\},~ n = 1, 2, 3, \cdots$ if
			</template>
			<template #a>
				<span class="problem-score">[4 points]&nbsp;</span> $a_n = 1 + (-1)^n$.
			</template>
			<template #b>
				<span class="problem-score">[4 points]&nbsp;</span> $a_n = n(n + 1)$.
			</template>
		</MakeProblem>
	</vk>
</template>
