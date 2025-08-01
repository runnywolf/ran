<template>
	<MakeProblem scoreText="(15 points)" listEndLabel="C" :listItemScoreTexts="['(5 points)', '(5 points)', '(5 points)']">
		<template #problem>
			If $G(x)$ is the generating function for the sequence $\{a_k\}$,
			what is the generating function for each of these sequences?
		</template>
		<template #A>$3a_0 ,~ 3a_1 ,~ 3a_2 ,~ 3a_3 ,~ \cdots$</template>
		<template #B>$0 ,~ 0 ,~ 0 ,~ 0 ,~ a_2 ,~ a_3 ,~ \cdots$</template>
		<template #C>$a_1 ,~ 2a_2 ,~ 3a_3 ,~ 4a_4 ,~ \cdots$</template>
	</MakeProblem>
</template>
