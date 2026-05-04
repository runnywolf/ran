<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			$A = @bm{ 1, -1, 1, 3, 2; 1, 1, -1, -4, 1; -1, 1, 1, 2, -2; 1, 1, 1, 1, 1 }$.
			Project $b = @bm{ 1; 2; 3; 4 }$ onto $A\!$’s column space and the resulting vector is $c$.
			$K$ is equal to the multiplication of all the elements of $c$. What is $\text{mod}(\text{round}(|4K|), 5)$?
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
