<template>
	<vk>
		<MakeProblem
			scoreText="(10 pt)"
			:optionSlotNames="[ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]"
			useUlToListOptions
		>
			<template #problem>
				True or false: NO need to justify your answer.
				<span class="problem-score">
					No credit for unanswered questions.
					Incorrect answers will deduct the credit until zero point is earned in this section.<br>
					(correct: 1, incorrect: -1, unanswered: 0 point per question)
				</span>
			</template>
			<template #a>
				For any square real matrix $A,~ A^T + A$ is always symmetric.
			</template>
			<template #b>
				For a square real matrix $A$, if $Ax = 0$ has a non-zero solution, then $A$ is invertible.
			</template>
			<template #c>
				$\{(0,0,0)\}$ is the orthogonal complement of $\R^3$ in $\R^3$.
			</template>
			<template #d>
				Let $A$ be a $m \times n$ real matrix, where $m < n$, with full row rank.
				$Ax = b$ has either 0 or 1 solution.
			</template>
			<template #e>
				Let $v$ be a vector in $S$ and $u$ be a vector such that $\lang u, v \rang = 0$, then $u \in S^\perp$.
			</template>
			<template #f>
				Let $A$ be a symmetric matrix. $C(A^T)$ and $N(A^T)$ are orthogonal complement.
			</template>
			<template #g>
				Let $u_1, \cdots, u_n$ be linearly dependent. Then $u_1, \cdots, u_{n-1}$ are linearly dependent.
			</template>
			<template #h>
				Let $U$ be a subspace of a vector space $V$. Then $(U^\perp)^\perp = U$.
			</template>
			<template #i>
				The null space of $A$ is equal to the column space of $A^TA$.
			</template>
			<template #j>
				Let $A$ and $B$ be $n \times n$ real matrices. Then, $rank(AB) \le \min(rank(A), rank(B))$
			</template>
		</MakeProblem>
	</vk>
</template>
