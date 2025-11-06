<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following statements are correct?
		</template>
		<template #A>
			If $|A| = r$ and $|B| = n$, there are $n^r$ different functions from $A$ to $B$.
		</template>
		<template #B>
			There are $\binom{13}{3}$ possible non‑negative integer solutions to the equation: $x_1 + x_2 + x_3 + x_4 = 10$.
		</template>
		<template #C>
			There are $\binom{n}{r}$ bit strings of length $n$ containing exactly $r$ 1’s.
		</template>
		<template #D>
			There are 23 ways to distribute 10 items to 4 identical empty boxes.
		</template>
		<template #E>
			There are $\binom{52}{13} \binom{39}{13} \binom{26}{13} \binom{13}{13}$ ways to distribute hands of
			13 cards to each of four players from the standard deck of 52 cards.
		</template>
	</MakeProblem>
</template>
