<template>
	<vk>
		<MakeProblem scoreText="(11 points)" :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				We want to count the number of paths from vertices $m$ to $n$ in the following graph.
				Each path is made up of a series of steps,
				where each step is a move one unit to the right or a move one unit upward.
				(No moves to the left or downward are allowed.)
			</template>
			<template #a>
				<span class="problem-score">(3 points)</span>
				What is the number of paths from vertices $m$ to $n$?
			</template>
			<template #b>
				<span class="problem-score">(4 points)</span>
				What is the number of paths from vertices $m$ to $n$ that do not go through vertex $x$?<br>
				<img src="./img/4.webp" style="width: 200px; margin-top: 10px;">
			</template>
			<template #c>
				<span class="problem-score">(4 points)</span>
				Let $P$ be the set of all vertices in the above graph. Define a binary relation $R$ on $P$ such that
				$(p, q) \in R$ if we need either one unit to the right or one unit upward to move from vertices $p$ to $q$.
				Is $(P, R)$ a partially ordered set? Why or why not?
			</template>
		</MakeProblem>
	</vk>
</template>
