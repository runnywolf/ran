<template>
	<MakeProblem
		scoreText="(5%)"
		:extraProblemSlotNames="['list']"
		:optionSlotNames="['A', 'B', 'C', 'D', 'E']"
	>
		<template #problem>
			How many of the following statements are true?
		</template>
		<template #list>
			<div class="ts-list is-unordered" style="--gap: 0.4rem">
				<div class="item">
					The inverse of an orthogonal matrix is orthogonal.
				</div>
				<div class="item">
					The product of two orthogonal matrices is an orthogonal matrix.
				</div>
				<div class="item">
					Every matrix with orthonormal columns is invertible.
				</div>
				<div class="item">
					If <vl exp="A, B \in \mathbb{R}^{n \times n}" />, and <vl exp="A + iB" />
					is a unitary matrix, then <vl exp="A^T B" /> is symmetric.
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
