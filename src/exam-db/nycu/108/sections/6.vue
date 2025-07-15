<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
			<template #problem>
				Let $Q(x)$ be the statement “$x + 1 \gt 2x$”.
				If the domain consists of all integers, what are these truth values?
			</template>
			<template #a>
				<span class="problem-score">(2 points)&nbsp;</span> $\exists x ~ Q(x)$
			</template>
			<template #b>
				<span class="problem-score">(2 points)&nbsp;</span> $\forall x ~ Q(x)$
			</template>
			<template #c>
				<span class="problem-score">(2 points)&nbsp;</span> $\exists x ~ \neg Q(x)$
			</template>
			<template #d>
				<span class="problem-score">(2 points)&nbsp;</span> $\forall x ~ \neg Q(x)$
			</template>
		</MakeProblem>
	</vk>
</template>
