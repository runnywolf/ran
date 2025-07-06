<template>
	<MakeProblem
		scoreText="(5%)"
		:extraProblemSlotNames="['list']"
		:optionSlotNames="['A', 'B', 'C', 'D', 'E']"
	>
		<template #problem>
			If <vl exp="A" /> is similar to <vl exp="B" />,
			how many of the following statements are true?
		</template>
		<template #list>
			<div class="ts-list is-unordered" style="--gap: 0.2rem">
				<div class="item">
					<vl exp="\! A^{-1}" /> is similar to <vl exp="B^{-1}" />.
				</div>
				<div class="item">
					<vl exp="\! A" /> and <vl exp="B" /> have the same eigenvalues.
				</div>
				<div class="item">
					<vl exp="\! A" /> and <vl exp="B" /> represent the same transformation with respect to different bases.
				</div>
				<div class="item">
					The nullity of <vl exp="A" /> is the same as the nullity of <vl exp="B" />.
				</div>
			</div>
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
