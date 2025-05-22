<template>
	<MakeProblem :score="10" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Given <vl exp="A = \!\begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix}\!" />.
			Assume that <vl exp="B^3 = A" /> and <vl exp="B" /> has real eigenvalues.
			What is the matrix <vl exp="B" />?
		</template>
		<template #A>
			<vl exp="
				\frac{1}{2}
				\!\begin{bmatrix}
				1 + 4\sqrt[3]{5} & -1 + \sqrt[3]{5} \, \\
				3 + \sqrt[3]{5} & 1 - 2\sqrt[3]{5} \,
				\end{bmatrix}
			" />
		</template>
		<template #B>
			<vl exp="
				\frac{1}{3}
				\!\begin{bmatrix}
				2 + \sqrt[3]{5} & 3 - \sqrt[3]{5} \, \\
				-1 + 3\sqrt[3]{5} & 1 + 2\sqrt[3]{5} \,
				\end{bmatrix}
			" />
		</template>
		<template #C>
			<vl exp="
				\frac{1}{4}
				\!\begin{bmatrix}
				3 + \sqrt[3]{5} & -1 + \sqrt[3]{5} \, \\
				-3 + 3\sqrt[3]{5} & 1 + 3\sqrt[3]{5} \,
				\end{bmatrix}
			" />
		</template>
		<template #D>
			<vl exp="
				\frac{1}{4}
				\!\begin{bmatrix}
				1 + 5\sqrt[3]{5} & 1 - \sqrt[3]{5} \, \\
				3 - 3\sqrt[3]{5} & 3 - \sqrt[3]{5} \,
				\end{bmatrix}
			" />
		</template>
		<template #E>
			<vl exp="
				\frac{1}{2}
				\!\begin{bmatrix}
				1 + 5\sqrt[3]{5} & 3 - \sqrt[3]{5} \, \\
				-3 + \sqrt[3]{5} & 1 - 3\sqrt[3]{5} \,
				\end{bmatrix}
			" />
		</template>
	</MakeProblem>
</template>
