<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Consider an analytical algorithm $A$ to take $n$ items as input set. When input size $n \le 4$,
			the process will terminate and return results, otherwise it will divide the input set into 4 roughly
			equal‑size subsets; 2 of 4 subsets serve as samples and act as inputs to recursively apply $A$ twice;
			the results of the previous 2 outcomes (from the 2 recursive $A$ executions) each has $n/4$ items;
			then we will use a procedure $I$ to integrate the 2 outcomes, where $I$ takes $\Theta(\sqrt{m/4})$
			when inputs are 2 sets of size $m$ subsets. What about this algorithm are true?
		</template>
		<template #a>$A$ is a linear recursive algorithm</template>
		<template #b>$A$ is a divide‑and‑conquer recursive algorithm</template>
		<template #c>$A\!$’s complexity is $\Theta(n^2)$</template>
		<template #d>$A\!$’s complexity is $\Theta(n\sqrt{n})$</template>
		<template #e>$A\!$’s complexity is $\Theta(\sqrt{n}\log n)$</template>
	</MakeProblem>
</template>
