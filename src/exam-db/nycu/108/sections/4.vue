<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				Given $A = \!\begin{bmatrix} 1 & -3 & -5 \\ 1 & 1 & -2 \\ 1 & -3 & 1 \\ 1 & 1 & 4 \end{bmatrix}\!$
				and $b = \!\begin{bmatrix} -6 \\ 1 \\ 1 \\ 6 \end{bmatrix}$.<br>
				If the Gram-Schmidt process is applied to determine an orthonormal basis for
				$R(A) = \{b \in R^m ~|~ b = A_{mn}x\}$ and $QR$ factorization of
				$A$, then, after the first one orthonormal vector $q_1$ and $r_{11}$ are computed, we have
				$$
				Q = [q_1 \quad q_2 \quad q_3]
				= \!\begin{bmatrix} 0.5 & - & - \\ 0.5 & - & - \\ 0.5 & - & - \\ 0.5 & - & - \end{bmatrix}\!
				\text{ and }
				R = \!\begin{bmatrix} r_{11} & r_{12} & r_{13} \\ 0 & r_{22} & r_{23} \\ 0 & 0 & r_{33} \end{bmatrix}\!
				= \!\begin{bmatrix} 2 & - & - \\ 0 & - & - \\ 0 & - & - \end{bmatrix} .
				$$
			</template>
			<template #a>
				<span class="problem-score">(5 points)</span>
				Finish above process and determine $q_2$ and $q_3$, and fill in the columns of $Q$.
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span>
				Finish above process and determine $R$.
			</template>
			<template #c>
				<span class="problem-score">(5 points)</span>
				Use the $QR$ factorization to find the least squares solution to $Ax = b$.
			</template>
		</MakeProblem>
	</vk>
</template>
<!-- [fix problem error] "[q_1 q_2 q_2]" -> "[q_1 q_2 q_3]" -->
