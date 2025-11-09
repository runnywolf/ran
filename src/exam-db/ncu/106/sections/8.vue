<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			We implement a merge sort algorithm to sort $n$ items. The algorithm will divide the set into
			2 roughly equal‑size halves, and merge the 2 halves after each half set is recursively sorted.
			Because the item comparison is complicated, the merge process takes $\Theta(m \sqrt{m})$ steps
			for input size $m$. What is the time complexity for this algorithm?
		</template>
		<template #a>$\Theta(n \log n)$</template>
		<template #b>$\Theta(n)$</template>
		<template #c>$\Theta(n^2)$</template>
		<template #d>$\Theta(n \sqrt{n})$</template>
		<template #e>$\Theta(n \sqrt{n} \log n)$</template>
	</MakeProblem>
</template>
