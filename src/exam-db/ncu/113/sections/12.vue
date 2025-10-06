<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Draw a graph with 64 vertices representing the squares of a chessboard.
			Connect two vertices with an edge if you can move legally between the corresponding squares
			with a single move of a knight.<br>
			The moves of a knight are L‑shaped, two squares vertically (or horizontally) followed by
			one square horizontally (respectively, vertically).
		</template>
		<template #a>This graph is bipartite.</template>
		<template #b>The largest degree number of the graph is 10.</template>
		<template #c>The smallest degree number of the graph is 4.</template>
		<template #d>There are four vertices of degree 2.</template>
		<template #e>There are eight vertices of degree 3.</template>
	</MakeProblem>
</template>
