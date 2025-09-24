<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			An alphabet set $\{ \alpha_1 , \alpha_2 , \cdots\!, \alpha_8  \}$ is used to form a string.
			A legal string cannot have consecutive
			$\{\alpha_1 \alpha_1 ,~ \alpha_1 \alpha_2 ,~ \alpha_2 \alpha_1 ,~ \alpha_2 \alpha_2 \}$
			in any part of the string.
			Suppose $P_{n-1}$ is the number of valid string of length $n$. Which of the following are true?
		</template>
		<template #A>$P_n = 2P_{n-1} + 6^n ,~ n \geq 2$</template>
		<template #B>$P_n = 6P_{n-1} + 12P_{n-2} ,~ n \geq 2$</template>
		<template #C>$P_n = 8P_{n-1} - 4 ,~ n \geq 2$</template>
		<template #D>$P_0 = 8 ,~ P_1 = 48$</template>
		<template #E>$P_0 = 8 ,~ P_1 = 64$</template>
	</MakeProblem>
</template>
