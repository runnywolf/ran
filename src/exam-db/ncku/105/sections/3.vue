<template>
	<MakeProblem scoreText="(10%)" listEndLabel="e">
		<template #problem>
			Determine whether the following are subspaces of $\mathbb{R}^{2 \times 2}$:
		</template>
		<template #a>
			The set of all $2 \times 2$ lower triangular matrices.
		</template>
		<template #b>
			The set of all $2 \times 2$ matrices $A$ such that $a_{11} = 1$.
		</template>
		<template #c>
			The set of all $2 \times 2$ matrices $B$ such that $b_{11} = 0$.
		</template>
		<template #d>
			The set of all symmetric $2 \times 2$ matrices.
		</template>
		<template #e>
			The set of all singular $2 \times 2$ matrices.
		</template>
	</MakeProblem>
</template>
