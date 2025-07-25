<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #a>
			Consider the following non‑decreasing sequence of natural numbers $\{ a_1, a_2, a_3, \cdots \}$:
			$$
			1, \underbrace{2, 2, 2, 2}_{4}, \underbrace{3, \cdots\!, 3}_{9},
			\underbrace{4, \cdots\!, 4}_{16}, 5, \cdots
			$$
			Note that there are exactly $k^2$ occurrence of $k$.
			Define a function $f(n)$ as the largest integer $m$ such that $a_m = n$.
			For example, $f(3) = 14$ and $f(4) = 30$. What is $f(f(n))$?
		</template>
		<template #b>
			Find all non‑negative integers $a$ and $b$ so that $\sqrt{a} + \sqrt{b} = \sqrt{2009}$.
		</template>
	</MakeProblem>
</template>
