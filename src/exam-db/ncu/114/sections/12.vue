<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $S$ be the transitive closure of $R$ and each element is a set.<br>
			If $S$ reflects operators’ behavior on <span class="ran-bold">Set</span>, what are possible operators?
		</template>
		<template #a>$\cap$</template>
		<template #b>$\cup$</template>
		<template #c>$\subseteq$</template>
		<template #d>$-$ (set difference)</template>
		<template #e>$\supset$</template>
	</MakeProblem>
</template>
