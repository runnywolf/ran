<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $A = @bm{ 2, 4, 2; 1, 5, 2; 4, -1, 9 }$, and the $LU$ decomposition of $A$ be
			$ @bm{ 1, 0, 0; a, 1, 0; b, c, 1 } @bm{ d, e, f; 0, g, h; 0, 0, i } $.
			What is $\lfloor a + b + c + d + e + f + g + h + i \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
