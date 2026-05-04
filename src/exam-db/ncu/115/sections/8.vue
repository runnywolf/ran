<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			The determinant of $@bm{ 1, 2, 5, 3, 7; 3, 7, 1, 4, 2; 2, 5, 1, 2, 6; -1, -6, 2, -5, 3; -3, -7, 4, -3, 9 }$ is $K$.
			What is $\text{mod}(|K|, 5)$?
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
