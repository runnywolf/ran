<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				Given a linear transformation $T: P_2(R) \rightarrow P_2(R)$ defined by
				$$T(f(x)) = f''(x) + 2f'(x) - f(x)$$
				where $P_2(R)$ represents the real-valued 2nd-order polynomials. Assume $M$ is the matrix
				representation of $T$ with respect to the ordered basis. Please find the determinant of
				$(M^{-1} + 2I)$, where $I$ is the identity matrix with the same dimension as $M$.
			</template>
			<template #A>0</template>
			<template #B>1</template>
			<template #C>2</template>
			<template #D>3</template>
			<template #E>4</template>
		</MakeProblem>
	</vk>
</template>
