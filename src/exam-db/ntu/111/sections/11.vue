<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				Given $A = \!\begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix}\!$.
				Assume that $B^3 = A$ and $B$ has real eigenvalues. What is the matrix $B$?
			</template>
			<template #A>
				$
				\frac{1}{2}
				\!\begin{bmatrix}
				1 + 4\sqrt[3]{5} & -1 + \sqrt[3]{5} \, \\
				3 + \sqrt[3]{5} & 1 - 2\sqrt[3]{5} \,
				\end{bmatrix}
				$
			</template>
			<template #B>
				$
				\frac{1}{3}
				\!\begin{bmatrix}
				2 + \sqrt[3]{5} & 3 - \sqrt[3]{5} \, \\
				-1 + 3\sqrt[3]{5} & 1 + 2\sqrt[3]{5} \,
				\end{bmatrix}
				$
			</template>
			<template #C>
				$
				\frac{1}{4}
				\!\begin{bmatrix}
				3 + \sqrt[3]{5} & -1 + \sqrt[3]{5} \, \\
				-3 + 3\sqrt[3]{5} & 1 + 3\sqrt[3]{5} \,
				\end{bmatrix}
				$
			</template>
			<template #D>
				$
				\frac{1}{4}
				\!\begin{bmatrix}
				1 + 5\sqrt[3]{5} & 1 - \sqrt[3]{5} \, \\
				3 - 3\sqrt[3]{5} & 3 - \sqrt[3]{5} \,
				\end{bmatrix}
				$
			</template>
			<template #E>
				$
				\frac{1}{2}
				\!\begin{bmatrix}
				1 + 5\sqrt[3]{5} & 3 - \sqrt[3]{5} \, \\
				-3 + \sqrt[3]{5} & 1 - 3\sqrt[3]{5} \,
				\end{bmatrix}
				$
			</template>
		</MakeProblem>
	</vk>
</template>
