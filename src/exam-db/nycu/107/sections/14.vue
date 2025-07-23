<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2', '3', '4', '5' ]" useUlToListOptions>
			<template #problem>
				Defining the $a_1, a_2, \cdots\!, a_n$ being $n$ column vectors in $\mathbb{R}^n$
				and let $A = \begin{bmatrix} a_1 ~ a_2 ~ \cdots ~ a_n \end{bmatrix}$,
			</template>
			<template #1>
				the vectors $a_1, a_2, \cdots\!, a_n$ will be linearly independent if and only if $A$ is nonsingular.
			</template>
			<template #2>
				the determinate of $A$ is nonzero.
			</template>
			<template #3>
				the vectors $a_1, a_2, \cdots\!, a_n$ will be linearly independent if and only if the null space $N(A) = \{0\}$.
			</template>
			<template #4>
				the rank of $A$ plus the nullity of $A$ equals $n$.
			</template>
			<template #5>
				the rank of $A^T$ equals the rank of $A$.
			</template>
		</MakeProblem>
	</vk>
</template>
