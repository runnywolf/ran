<template>
	<MakeProblem listEndLabel="E">
		<template #problem>A full $m\!$‑ary tree with</template>
		<template #A>$n$ vertices has $i = (n - 1)/m$ internal vertices.</template>
		<template #B>$n$ vertices has $l = [(m - 1)n + 1]/m$ leaves.</template>
		<template #C>$i$ internal vertices has $l = (m - 1)i + 1$ leaves.</template>
		<template #D>$l$ leaves has $n = (ml - 1)/(m - 1)$ vertices.</template>
		<template #E>$l$ leaves has $i = (l - 1)/(m - 1)$ internal vertices.</template>
	</MakeProblem>
</template>
