<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2', '3', '4', '5' ]" useUlToListOptions>
			<template #problem>
				A $n \times n$ matrix A is said to be nonsingular, if
			</template>
			<template #1>
				$A$ is non‑invertible.
			</template>
			<template #2>
				there exists a multiplicative inverse matrix $B$
				such that $A$ is row equivalent to $B$.
			</template>
			<template #3>
				the determinate of $A$ is nonzero.
			</template>
			<template #4>
				$Ax = 0$ where $x$ is nonzero vector.
			</template>
			<template #5>
				$A$ is row equivalent to $I$.
			</template>
		</MakeProblem>
	</vk>
</template>
