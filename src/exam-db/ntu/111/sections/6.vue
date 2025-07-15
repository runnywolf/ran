<template>
	<vk>
		<MakeProblem scoreText="(5%)" :extraProblemSlotNames="['list']" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				If $A$ is similar to $B$, how many of the following statements are true?
			</template>
			<template #list>
				<div class="ts-list is-unordered" style="--gap: 0.2rem">
					<div class="item">
						$\! A^{-1}$ is similar to $B^{-1}$.
					</div>
					<div class="item">
						$\! A$ and $B$ have the same eigenvalues.
					</div>
					<div class="item">
						$\! A$ and $B$ represent the same transformation with respect to different bases.
					</div>
					<div class="item">
						The nullity of $A$ is the same as the nullity of $B$.
					</div>
				</div>
			</template>
			<template #A>0</template>
			<template #B>1</template>
			<template #C>2</template>
			<template #D>3</template>
			<template #E>4</template>
		</MakeProblem>
	</vk>
</template>
