<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
			<template #problem>
				Determine whether each of these functions is a bijection from $R$ to $R$.
			</template>
			<template #a>
				<span class="problem-score">(2 points)&nbsp;</span> $f(x) = -3x + 4$
			</template>
			<template #b>
				<span class="problem-score">(2 points)&nbsp;</span> $f(x) = -3x^2 + 7$
			</template>
			<template #c>
				<span class="problem-score">(2 points)&nbsp;</span> $f(x) = (x + 1)/(x + 2)$
			</template>
			<template #d>
				<span class="problem-score">(2 points)&nbsp;</span> $f(x) = x^5 + 1$
			</template>
		</MakeProblem>
	</vk>
</template>
