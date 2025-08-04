<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(5 points)', '(5 points)', '(5 points)']">
		<template #problem>
			In the following questions, just give the answer, do not give any explanation.
		</template>
		<template #a>
			Find $11^{121} \bmod 13$.
		</template>
		<template #b>
			Find all solutions of the system of congruences $x \equiv 4 \pmod{6}$ and $x \equiv 13 \pmod{15}$.
		</template>
		<template #c>
			Determine a rule for generating the terms of the sequence that begins $1, 3, 4, 8, 15, 27, 50, 92, \cdots$,
			and find the next three terms of the sequence.
		</template>
	</MakeProblem>
</template>
