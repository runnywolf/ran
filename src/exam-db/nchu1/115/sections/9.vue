<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			A professor at National Chung Hsing University teaching a Discrete Mathematics course gives a
			multiple‑choice quiz with 10 questions, each having 5 choices.
			Which of the following statements are <span class="ran-bold">true</span>?
		</template>
		<template #A>
			If two answer sheets are randomly drawn, the probability that the two answer sheets are identical is $@df{1;5^{10}}$.
		</template>
		<template #B>
			If two answer sheets are randomly drawn, the probability that the two answer sheets are different is $1-@df{1;5^{10}}$.
		</template>
		<template #C>
			The maximum number of students the class can have without forcing three identical answer sheets is $2\cdot6^{10}$.
		</template>
		<template #D>
			The minimum number of students needed to guarantee that at least three answer sheets are identical is $2\cdot5^{10}+1$.
		</template>
		<template #E>
			The minimum number of students needed to guarantee that at least four answer sheets are identical is $3\cdot6^{10}+1$.
		</template>
	</MakeProblem>
</template>
