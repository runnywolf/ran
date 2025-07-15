<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				A DNA sequence of length $n$ is a sequence of $n$ molecules,
				where each molecule is represented by either ‘C’, ‘G’, ‘A’, or ‘T’.
				Consider a sequence $a_1, a_2, \ldots, a_n$, where $a_i ~,~ 1 \le i \le n$,
				denotes the number of DNA sequences of length $i$ that contain two consecutive ‘G’s.
				We may express $a_n$ as a recurrence relation
				$$a_n = s \times a_{n-1} + t \times a_{n-2} + f(n),$$
				where $s$ and $t$ are positive integers and $f(n)$ is a function of $n$.
			</template>
			<template #a>
				<span class="problem-score">(3 points)&nbsp;</span> $a_4 = {?}$
			</template>
			<template #b>
				<span class="problem-score">(3 points)</span> What is the value of $s + t$?
			</template>
			<template #c>
				<span class="problem-score">(4 points)</span> What is the definition of $f(n)$?
			</template>
		</MakeProblem>
	</vk>
</template>
