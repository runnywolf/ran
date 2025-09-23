<template>
	<MakeProblem scoreText="">
		<template #problem>
			An alphabet set $\{a_1, a_2, ..., a_8\}$ is used to form a string. A legal string cannot have consecutive $\{a_1a_1, a_1a_2, a_2a_1, a_2a_2\}$ in any part of the string. Suppose $P_{n-1}$ is the number of valid string of length $n$. Which of the following are true?
			 A) $P_n = 2P_{n-1} + 6^n, n \geq 2$ B) $P_n = 6P_{n-1} + 12P_{n-2}, n \geq 2$
			 C) $P_n = 8P_{n-1} - 4, n \geq 2$ D) $P_0 = 8P_1 = 48$ E) $P_0 = 8P_1 = 64$
		</template>
	</MakeProblem>
</template>
