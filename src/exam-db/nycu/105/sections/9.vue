<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(3 points)', '(3 points)', '(3 points)']">
		<template #problem>
			In the following questions, just give the answer, do not give any explanation.
		</template>
		<template #a>
			Determine whether the following proposition is a tautology:
			$$( ( p \to \lnot q ) \land q ) \to \lnot p$$
		</template>
		<template #b>
			Suppose $g : A \to B$ and $f : B \to C$, where $f \circ g$ is 1-1.
			Determine which of the following statements is correct:<br>
			(1) if $g$ is 1-1, then $f$ is 1-1;<br>
			(2) if $f$ is 1-1, then $g$ is 1-1;<br>
			(3) both of (1) and (2) are correct;<br>
			(4) both of (1) and (2) are incorrect.
		</template>
		<template #c>
			Suppose $f : \mathbb{R} \to \mathbb{R}$ and $g : \mathbb{R} \to \mathbb{R}$
			where $g(x) = 2x + 1$ and $g \circ f(x) = 2x + 11$. Find the rule for $f$.
		</template>
	</MakeProblem>
</template>
