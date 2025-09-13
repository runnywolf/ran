<template>
	<MakeProblem listEndLabel="e">
		<template #problem>Find the cut vertices and cut edges in the following graph.</template>
		<template #a>The cut vertices are $b, c, d$ and $e$.</template>
		<template #b>The cut vertices are $b, c$, and $e$.</template>
		<template #c>The only cut edge is $\{ c, e \}$.</template>
		<template #d>The cut edges are $\{ a, b \}$ and $\{ c, e \}$.</template>
		<template #e>
			The cut edges are $\{ b, d \}$ and $\{ c, e \}$.<br>
			<img src="./img/14.webp" style="margin-top: 10px">
		</template>
	</MakeProblem>
</template>
