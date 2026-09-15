<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Find the unique solution $x$ modulo 105 that satisfies:
			$$\begin{cases} x \equiv 2 \pmod{3} \\ x \equiv 4 \pmod{5} \\ x \equiv 6 \pmod{7} \end{cases}$$
			Please determine the value of $x ~\text{mod}~ 11$.
		</template>
		<template #A>5</template>
		<template #B>6</template>
		<template #C>8</template>
		<template #D>9</template>
		<template #E>10</template>
	</MakeProblem>
</template>
