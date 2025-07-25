<template>
	<vk>
		<MakeProblem scoreText="(10 points)" :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Given a graph G3, the first vertex can be colored with any color.
				The second one can be colored with any color that was not chosen from the first vertex.
				The adjacent vertices of the G3 are colored differently.
			</template>
			<template #a>
				<span class="problem-score">(2 points)</span>
				The chromatic number is the smallest number of colors needed to produce a proper coloring of a graph.
				What is the chromatic number of G, denoted by $\chi(G)$?
			</template>
			<template #b>
				<span class="problem-score">(3 points)</span>
				The chromatic polynomial is a polynomial that represents the number of distinct ways to
				color the vertices of a graph. What is the chromatic polynomial of G3,$P_G$?
			</template>
			<template #c>
				<span class="problem-score">(5 points)</span>
				Let $P_G(n)$ be the number of different ways to color the vertices of G3 using $n$ colors,
				where $n \ge 0$ is an integer. What is minimum number of $P_G(n)$, where $P_G(n) \gt 0$?
				<div class="ts-wrap is-vertical is-center-aligned" style="margin-top: 12px;">
					<img src="./img/5.webp">
				</div>
			</template>
		</MakeProblem>
	</vk>
</template>
