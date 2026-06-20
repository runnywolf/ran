<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #problem>
			Consider the counting of the number of onto functions $H: A \to B$ where $|A| \ge |B|$.
		</template>
		<template #a>
			Find the exponential generating function for the above counting such that the coefficient of
			$@f{x^{|A|+2};|A|!}$ is the answer of the above counting.
		</template>
		<template #b>
			Apply the above exponential generating function to find the answer of the above counting where $|A|=10$ and $|B|=3$.
		</template>
	</MakeProblem>
</template>
