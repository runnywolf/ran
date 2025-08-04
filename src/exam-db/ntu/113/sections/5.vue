<template>
	<MakeProblem scoreText="(10 points)" :extraSlotNames="['sub-problems', 'graph']">
		<template #problem>
			For the following graph:
		</template>
		<template #sub-problems>
			<div class="ts-list is-unordered" style="--gap: 0.2rem">
				<div class="item">
					<span class="problem-score">(4 points)</span>
					Its chromatic number is _____ (the smallest number of colors needed to color the nodes).
				</div>
				<div class="item">
					<span class="problem-score">(4 points)</span>
					The size of the maximum independent set is _____.
				</div>
				<div class="item">
					<span class="problem-score">(1 points)</span>
					Is it Eulerian _____ (yes/no)?
				</div>
				<div class="item">
					<span class="problem-score">(1 points)</span>
					Is it Hamiltonian _____ (yes/no)?
				</div>
			</div>
		</template>
		<template #graph>
			<div class="ts-grid is-center-aligned" style="margin-top: 8px;">
				<img src="./img/5.webp">
			</div>
		</template>
	</MakeProblem>
</template>
