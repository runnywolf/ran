<template>
	<vk>
		<MakeProblem scoreText="(5 points)">
			<template #problem>
				We define a bag is a set that allows repetitions of elements.
				For example, $\{1, 2, 2, 2, 3, 3, 4\}$ and $\{1, 2, 3\}$ are different bags.
				Obviously, every set is also a bag.
				<div style="height: 8px;"></div>
				We define $\#(x|S)$ as the repetitions of element $x$ in bag $S$.
				For example, $\#(2|\{1, 2, 2, 2, 3, 3, 4\}) = 3$, $\#(1|\{1, 2, 2, 2, 3, 3, 4\}) = 1$,
				$\#(5|\{1, 2, 2, 2, 3, 3, 4\}) = 0$, etc.
				<div style="height: 8px;"></div>
				A subbag $S$ of a bag $T$ satisfies the following conditions:
				<div style="margin: 6px 16px;">
					(i) $S$ is a subset of $T$ when they are viewed as sets;<br>
					(ii) for every element $x$, $\#(x|S) \leq \#(x|T)$.
				</div>
				For example, $\{1, 2, 3, 3, 4\}$ is a subbag of $\{1, 2, 2, 3, 3, 3, 4\}$
				while $\{1, 2, 2, 3, 3, 3, 4\}$ is not a subbag of $\{1, 2, 2, 3, 3, 4\}$.
				<div style="height: 8px;"></div>
				How many subbags of $\{4, 5, 5, 6, 6, 6, 7, 7\}$ are there?
			</template>
		</MakeProblem>
	</vk>
</template>
