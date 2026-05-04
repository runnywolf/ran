<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			$A = @bm{ 3, 2; -1, 0 } ,~ B = @bm{ M, N; P, Q } = A^{20}$.
			What is $\text{mod}(|P|, 5)$, where $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
