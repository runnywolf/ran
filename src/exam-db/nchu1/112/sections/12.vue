<template>
	<MakeProblem listEndLabel="f">
		<template #problem>
			True or False<span class="problem-score"> (12%; 2% each)</span>:
		</template>
		<template #a>
			Suppose you deal 52 regular playing cards into 13 piles of 4 cards each. You can always select one card from each pile
			to get one of each of the 13 card values Ace, 2, 3, ..., 10, Jack, Queen, and King.
		</template>
		<template #b>A graph has an Euler circuit if and only if the degree of every vertex is even.</template>
		<template #c>Every tree is a bipartite graph.</template>
		<template #d>If a graph has degree sequence (4, 4, 3, 3, 3, 2, 1), the number of edges in the graph is 20.</template>
		<template #e>
			The minimum number of bits to encode a source with symbols $\{A,B,C\}$ and $\text{Prob}(A)=0.5$,
			$\text{Prob}(B)=0.25$, and $\text{Prob}(C)=0.25$ is 2 bits.
		</template>
		<template #f>The statements $(P\lor Q)\to R$ and $(P\to R)\lor(Q\to R)$ are logically equivalent.</template>
	</MakeProblem>
</template>
