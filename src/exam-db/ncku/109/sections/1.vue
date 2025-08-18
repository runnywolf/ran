<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			<span class="problem-score">True or False (25%. 5 pts each)<br></span>
			For each of the statements that follows, answer <span class="ran-bold">true</span>
			if the statement is always true and <span class="ran-bold">false</span> otherwise.
		</template>
		<template #a>
			If $A$ and $B$ are $n \times n$ matrices that have the same rank,
			then the rank of $A^2$ must equal the rank of $B^2$.
		</template>
		<template #b>
			Let $L : \mathbb{R}^2 \rightarrow \mathbb{R}^2$ be a linear operator,
			and let $A$ be the standard matrix representation of $L$. If $L^2$ is defined by
			$$L^2(x) = L(L(x)) \text{ for all } x \in \mathbb{R}^2$$
			then $L^2$ is a linear operator and its standard matrix representation is $A^2$.
		</template>
		<template #c>
			If $L_1$ and $L_2$ are both linear operators on a vector space $V$,
			then $L_1 + L_2$ is also a linear operator on $V$, where $L_1 + L_2$ is the mapping defined by
			$$(L_1 + L_2)(v) = L_1(v) + L_2(v) \text{ for all } v \in V$$
		</template>
		<template #d>
			If $N(A) = \{0\}$, then the system $Ax = b$ will have a unique least squares solution.
		</template>
		<template #e>
			If $\{u_1, u_2, \cdots\!, u_k\}$ is an orthonormal set of vectors in $\mathbb{R}^n$ and
			$$U = \{u_1, u_2, \cdots\!, u_k\}$$
			then $UU^T = I_n$ (the $n \times n$ identity matrix).
		</template>
	</MakeProblem>
</template>
