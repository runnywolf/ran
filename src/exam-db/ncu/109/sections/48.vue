<template>
	<MakeProblem scoreText="">
		<template #problem>
			We will evaluate the time complexity of a recursive algorithm A with input of $n$ items. Algorithm A works as follow: when input size is $m$, the algorithm will first use $\theta (\sqrt{m})$ steps to prepare and divide the input into 4 roughly equal-size subsets; for each size $m/4$ subset, recursively call $A$; finally it use $\theta (\sqrt{m})$ steps to merge all 4 partial results to get the final solution. What is the time complexity for this algorithm?
			a) $\theta (n)$ b) $\theta (n \log n)$ c) $\theta (n^2)$ d) $\theta (\sqrt{n})$ e) $\theta (\sqrt{n} \log n)$
		</template>
	</MakeProblem>
</template>
