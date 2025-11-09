<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			We will evaluate the time complexity of a recursive algorithm A with input of $n$ items.
			Algorithm A works as follow: when input size is $m$, the algorithm will first use $\Theta (\sqrt{m})$
			steps to prepare and divide the input into 4 roughly equal‑size subsets; for each size $m/4$ subset,
			recursively call $A$; finally it use $\Theta (\sqrt{m})$ steps to merge all 4 partial results
			to get the final solution. What is the time complexity for this algorithm?
		</template>
		<template #a>$\Theta (n)$</template>
		<template #b>$\Theta (n \log n)$</template>
		<template #c>$\Theta (n^2)$</template>
		<template #d>$\Theta (\sqrt{n})$</template>
		<template #e>$\Theta (\sqrt{n} \log n)$</template>
	</MakeProblem>
</template>
