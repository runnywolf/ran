<template>
	<MakeProblem scoreText="(30%)" listEndLabel="c" :listItemScoreTexts="['(10%)', '(10%)', '(10%)']">
		<template #a>
			Assume $N$ is a positive integer, please show that the statement
			<span class="ran-no-break">“if $2^N - 1$ is prime, then $N$ is prime”</span>
			is true using proof by contrapositive.
		</template>
		<template #b>
			$5n + 7m = N$, where $n, m, N$ are integers and $n \ge 0,~ m \ge 0,~ N \ge 24$.
			Please show that we can always find $n, m$ to satisfy the equality.
			For example, $(n, m) = (2, 2)$ corresponds to $5 \cdot 2 + 7 \cdot 2 = 24$
			and $(n, m) = (5, 0)$ corresponds to $5 \cdot 5 + 7 \cdot 0 = 25$.
		</template>
		<template #c>
			Assume a set $G$ whose elements are real numbers and the size of $G$ is equal to $2^k$,
			where $k$ is a positive integer. We just want to find the maximum value and the minimum value in this set $G$
			and develop an algorithm in the following.
<CodeBlock topMargin bottomMargin><pre>
FindMaxMin(G)
If G contains only two numbers:
	Compare these two numbers
	Set M to be the larger one
	Set m to be the smaller one
Else:
	Divide G into two subsets with equal size G1 and G2
	Apply FindMaxMin(G1) to get M1 and m1
	Apply FindMaxMin(G2) to get M2 and m2
	M=max(M1,M2), m=min(m1,m2)
Return M,m
</pre></CodeBlock>
			We use $T(N)$ to represent the number of comparisons
			when the set size is equal to $N$. $N=2^k$. Please find $T(N)$ in terms of $N$.
		</template>
	</MakeProblem>
</template>
