<template>
	<vk>
		<MakeProblem
			scoreText="(25 points)"
			:extraProblemSlotNames="[ 'score' ]"
			:optionSlotNames="[ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]"
			useUlToListOptions
		>
			<template #problem>
				Answer the following problems. <span class="problem-score">Any negative total score will be adjusted to 0 points.</span>
			</template>
			<template #score>
				Consider the problems (a)‑(d), determine whether each statement is True or False.
				If a statement is False, provide a justification explaining why it is incorrect.
				<span class="problem-score">
					You will receive 4 points for each correct answer,
					a penalty of -4 points for each incorrect answer, or 0 points for no answer.
				</span>
				<br>
				For the problems (e)‑(g), find the solutions and provide your answers.
				<span class="problem-score">
					You will receive 3 points for each correct answer, or 0 points for each incorrect answer or no answer.
				</span>
			</template>
			<template #a>
				A square matrix $A$ is invertible if and only if $\lambda = 1$ is an eigenvalue of $A$.
			</template>
			<template #b>
				If $W$ is a subspace of $\mathbb{R}^n$,
				then the orthogonal complement of $W$ is also a subspace of $\mathbb{R}^n$.
			</template>
			<template #c>
				If $E$ is an $m \times m$ elementary matrix and $A$ is an $m \times n$ matrix,
				then the null space of $EA$ is the same as the null space of $A$.
			</template>
			<template #d>
				If $f = \cos^2 x ,~ g = \sin^2 x$, and $h = 1 + x^2$,
				then $h$ lies in the space spanned by $f$ and $g$.
			</template>
			<template #e>
				Find the number of parameters in the general solution of $Ax = 0$
				if $A$ is a $5 \times 7$ matrix of rank 3.
			</template>
			<template #f>
				Find the rank of a $5 \times 6$ matrix $A$ for which $Ax = 0$ has a two‑dimensional solution space.
			</template>
			<template #g>
				Find the value of $k$ such that the vector $(k, 21, -12)$
				is a linear combination of vectors $(-2, 2, 1)$ and $(2, 1, -2)$.
			</template>
		</MakeProblem>
	</vk>
</template>
