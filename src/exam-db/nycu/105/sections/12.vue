<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Please answer the following questions based on the two graphs below.
				<div class="ts-wrap is-center-aligned" style="--gap: 50px; margin: 16px 0;">
					<div class="ts-wrap is-vertical is-center-aligned">
						<img src="./img/12-1.webp">
						<div>(I)</div>
					</div>
					<div class="ts-wrap is-vertical is-center-aligned">
						<img src="./img/12-2.webp">
						<div>(II)</div>
					</div>
				</div>
				Graph (I) is part of the relation in the Fibonacci sequence.
				Let $R$ denote the relation represented by Graph (I).
			</template>
			<template #a>
				<span class="problem-score">(3 points)</span>
				Are Graph (I) and Graph (II) isomorphic? If your answer is NO, please give your reasons;
				otherwise, please show the correspondence between the two vertex sets.
			</template>
			<template #b>
				<span class="problem-score">(1 points)</span>
				Is Graph (II) planar?
			</template>
			<template #c>
				<span class="problem-score">(5 points)</span>
				Please give the 0-1 matrix of the composite relation $R^4$
				under the vertex ordering $2, 3, 5, 8, 13, 21$.
				What is the meaning of the $(1, 6)$ entry in the matrix.
			</template>
		</MakeProblem>
	</vk>
</template>
