<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Let
				$
				A = \!\begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}\! ,~
				B = \!\begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}\! ,~
				C = \!\begin{bmatrix} 2 & i \\ -i & 1 \end{bmatrix}\! ,~
				D = \!\begin{bmatrix} i & 1 \\ 1 & 1 \end{bmatrix}\! ,
				$
				and
				$E = \!\begin{bmatrix} i & 0 \\ 0 & 2i \end{bmatrix}\!$.
			</template>
			<template #a>
				<span class="problem-score">[2 points]</span>
				A matrix $ M $ is symmetric if $ M^T = M $. List matrices that are symmetric.
			</template>
			<template #b>
				<span class="problem-score">[2 points]</span>
				A matrix $ M $ is Hermitian if $ M^H = M $. List matrices that are Hermitian.
			</template>
		</MakeProblem>
	</vk>
</template>
