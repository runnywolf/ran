<template>
	<MakeProblem scoreText="(5%)" :extraSlotNames="['list']" listEndLabel="E" useSpanList>
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
					If $A, B \in \mathbb{R}^{n \times n}$, and $A + iB$
					is a unitary matrix, then $A^T B$ is symmetric.
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
