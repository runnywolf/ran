<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Let $A = \begin{bmatrix} a_1 & a_2 & a_3 & a_4 \end{bmatrix}$ be a 4x4 matrix
				with reduced row echelon form given by
				$U = \!\begin{bmatrix} 1 & 0 & 2 & 1 \\ 0 & 1 & 1 & 4 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}\!$.
				If $a_1 = \!\begin{bmatrix} -3 \\ 5 \\ 2 \\ 1 \end{bmatrix}\!$ and
				$a_2 = \!\begin{bmatrix} 4 \\ -3 \\ 7 \\ -1 \end{bmatrix}\!$,
			</template>
			<template #a>
				<span class="problem-score">[2 points]</span> Find the rank of $A$.
			</template>
			<template #b>
				<span class="problem-score">[4 points]</span> Find a basis of null space of $A.
			</template>
			<template #c>
				<span class="problem-score">[4 points]</span> Find $a_3$ and $a_4$.
			</template>
		</MakeProblem>
	</vk>
</template>
