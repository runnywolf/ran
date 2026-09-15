<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $\phi(n)$ denote Euler’s totient function, which counts the number of integers between $1$ and $n$
			that are relatively prime to $n$. Consider the integer $n=2^3\cdot3^2\cdot7$.
			Which of the following statements are <span class="ran-bold">true</span>?
		</template>
		<template #A>$\phi(n)=(2-1)^3\cdot(3-1)^2\cdot(7-1)$</template>
		<template #B>$\phi(n)=n\cdot(1-@f{1;2})\cdot(1-@f{1;3})\cdot(1-@f{1;7})$</template>
		<template #C>$\phi(n)=2^{3-1}\cdot3^{2-1}\cdot(7-1)$</template>
		<template #D>$\phi(n)$ is divisible by 12.</template>
		<template #E>$\phi(n)=(2-1)^{3-1}\cdot(3-1)^{2-1}\cdot1$</template>
	</MakeProblem>
</template>
