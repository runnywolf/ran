<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2', '3', '4', '5' ]" useUlToListOptions>
			<template #problem>
				If there are two $n \times n$ matrices $A, B$ and one scalar $r$,
			</template>
			<template #1>
				$\det(A) = \det(B)$ implies $A = B$.
			</template>
			<template #2>
				$\det(rA + B) = r \cdot \det(A) + \det(B)$.
			</template>
			<template #3>
				$\det((AB)^T) = \det(A) \det(B)$.
			</template>
			<template #4>
				$\det(A) = \det(B)$ where $A$ and $B$ are row equivalent matrices.
			</template>
			<template #5>
				$\det((AB)^{-1}) = \det(A^{-1}) \det(B^{-1})$.
			</template>
		</MakeProblem>
	</vk>
</template>
