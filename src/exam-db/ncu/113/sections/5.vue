<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $A = @bm{ 1, 2, 3, 4; 0, 1, 2, 3; 0, 0, 1, 2; 0, 0, 0, 1 }$.
			What is the dimension spanned by the eigenvectors of $A$?
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
