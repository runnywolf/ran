<template>
	<MakeProblem :score="10" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Given
			<vl exp="\def\arraystretch{1.35} A = \!\begin{bmatrix} \frac{3}{5} & \frac{2}{5} \\ \frac{2}{5} & \frac{3}{5} \end{bmatrix}\!" />
			and
			<vl exp="\def\arraystretch{1.1} x = \!\begin{bmatrix} 2 \\ 0 \end{bmatrix}\!" />.
			If
			<vl exp="\def\arraystretch{1.1} \lim\limits_{n \to \infty} A^n x = \!\begin{bmatrix} a \\ b \end{bmatrix}\!" />,
			what is
			<vl exp="2a + b" />?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>
