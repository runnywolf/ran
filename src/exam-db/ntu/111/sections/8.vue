<template>
	<MakeProblem scoreText="(5%)" listEndLabel="E" useSpanList>
		<template #problem>
			Assume that $A \in \mathbb{R}^{n \times n}$ and $A^2 + 4A + 6I_n = O$.
			If $(A + 3I_n)^{-1} = aA + bI_n$. what is the value of $2a + b$?
		</template>
		<template #A>-2</template>
		<template #B>-1</template>
		<template #C>0</template>
		<template #D>1</template>
		<template #E>2</template>
	</MakeProblem>
</template>
