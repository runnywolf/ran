<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e' ]" useUlToListOptions>
			<template #problem>
				Please answer TRUE or FALSE for the following statements and give CONCISE explanations.
			</template>
			<template #a>
				<span class="problem-score">(2 points)</span>
				A simple graph is called regular if every vertex of this graph has the same degree.
				An $n\!$‑cube, denoted by $Q_n$, is a graph that has vertices representing the $2^n$ bit strings
				of length $n$. Two vertices are adjacent if and only if the bit strings
				that they represent differ in exactly one bit position. $Q_n$ is regular.
			</template>
			<template #b>
				<span class="problem-score">(2 points)</span>
				Let $V_n$ and $E_n$ respectively be the number of vertices and edges of $Q_n$, the $n\!$‑cube.
				Then, $E_1 = 1,~ E_2 = 4,$ and $E_{n+1} = 2V_n + E_n$.
			</template>
			<template #c>
				<span class="problem-score">(2 points)</span>
				The complete bipartite graphs $K_{2,3}$ and $K_{3,3}$ are planar.
			</template>
			<template #d>
				<span class="problem-score">(2 points)</span>
				There are exactly 2 shortest paths between $v_1$ and $v_2$ in the graph represented by the adjacency matrix
				$$
				\begin{matrix}
				& \begin{matrix} e_1 \!&\! e_2 \!&\! e_3 \!&\! e_4 \!&\! e_5 \!&\! e_6 \!&\! e_7 \end{matrix} \\
				\begin{matrix} v_1 \\ v_2 \\ v_3 \\ v_4 \\ v_5 \end{matrix} \!\!\!\!\! &
				\begin{bmatrix}
				1 & 0 & 0 & 0 & 0 & 0 & 1 \\
				0 & 0 & 0 & 0 & 1 & 1 & 1 \\
				1 & 1 & 0 & 1 & 0 & 1 & 0 \\
				0 & 1 & 1 & 0 & 0 & 0 & 0 \\
				0 & 0 & 1 & 1 & 1 & 0 & 0 \\
				\end{bmatrix}
				\end{matrix}
				$$
				with $|e_1| = 1 ,~ |e_2| = 2 ,~ |e_3| = 1 ,~ |e_4| = 4 ,~ |e_5| = 1 ,~ |e_6| = 4 ,~ |e_7| = 5$.
			</template>
			<template #e>
				<span class="problem-score">(2 points)</span>
				In the graph given by the previous question, there exists an Euler path from $v_5$ to $v_1$.
			</template>
		</MakeProblem>
	</vk>
</template>
