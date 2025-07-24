<template>
	<vk>
		<MakeProblem scoreText="(5 points)">
			<template #problem>
				Consider a relation $\angle$ represented by the following digraph,
				where a directed edge from node $i$ to node $j$ exists if and only if $i ~\angle~ j$.
				Consider another relation $\approx$ defined as $i \approx j$
				if and only if neither $i ~\angle~ j$ nor $j ~\angle~ i$.
				If we represent $\approx$ using a zero‑one matrix, how many 1’s are there in the matrix?
				<div class="ts-wrap is-vertical is-center-aligned" style="margin: 10px 0">
					<img src="./img/4.webp" style="height: 150px;"><!-- by GPT-4o -->
				</div>
			</template>
		</MakeProblem>
	</vk>
</template>
