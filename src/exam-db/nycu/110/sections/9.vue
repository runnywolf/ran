<template>
	<vk>
		<MakeProblem scoreText="(15 pt)" :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e' ]" useUlToListOptions>
			<template #problem>
				Multiple choice questions and fill-in-the-blank questions. NO need to justify your answer.
				<span class="problem-score">
					No credit for unanswered questions.
					Incorrect answers will deduct the credit until zero point is earned in this section.<br>
					(correct: 3, incorrect: -1, unanswered: 0 point per question)
				</span>
			</template>
			<template #a>
				Let $W$ be a subspace of $\mathbb{R}^n$ and $W^\perp$ denotes its orthogonal complement.
				If $W_1$ is a subspace of $\mathbb{R}^n$ such that $x \in W_1$, then $x^Tu = 0$ for all $u \in W^\perp$.
				Justify whether the following statements are true or false.
				<ol class="ran-order-list is-lower-roman" style="margin-top: 10px; margin-bottom: 10px;">
					<li>$\dim({W_1}^\perp) \leq \dim(W^\perp)$</li>
					<li>$\dim({W_1}^\perp) \leq \dim(W)$</li>
					<li>$\dim({W_1}^\perp) \geq \dim(W)$</li>
					<li>$\dim({W_1}^\perp) \geq \dim(W^\perp)$</li>
				</ol>
			</template>
			<template #b>
				Let $A$ be a $7 \times 5$ matrix with $\text{rank}(A) = 5$.
				Justify whether the following statements are true or false.
				<ol class="ran-order-list is-lower-roman" style="margin-top: 10px; margin-bottom: 10px;">
					<li>
						There exists at least one $b \in \R^7$ such that $Ax = b$
						has infinite number of least square solutions.
					</li>
					<li>
						For any $b \in \R^7$, $Ax = b$ has infinite number of solution.
					</li>
					<li>
						There exists at least one $b \in \R^7$ such that $Ax = b$
						has a unique least square solution.
					</li>
					<li>
						For any $b \in \R^7$, $Ax = b$ has a unique solution.
					</li>
				</ol>
			</template>
			<template #c>
				Let $\hat{B} = \begin{bmatrix} (i) \\ (ii) \end{bmatrix} \in \mathbb{R}^2$
				be the least-squares solution that minimize $\|Y-XB\|^2$ where 
				$$
				X = \begin{bmatrix} 2 & 0 \\ -1 & 1 \\ 0 & 2 \end{bmatrix}
				\quad \text{and} \quad
				Y = \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix} ,
				$$
				Find the value for $(i)$ and $(ii)$.
			</template>
			<template #d>
				Let $\!\begin{bmatrix} (i) \\ (ii) \end{bmatrix}\!$ be the orthogonal projection of $b$ onto $u$, where
				$$
				b = \!\begin{bmatrix} -24 & 2 \\ -10 & -10 \end{bmatrix}
				\quad \text{and} \quad
				u = \!\begin{bmatrix} 2 \\ -10 \end{bmatrix} ,
				$$
				Find the value for $(i)$ and $(ii)$.
			</template>
			<template #e>
				Let $\!\begin{bmatrix} (i) \\ (ii) \\ (iii) \end{bmatrix}\!$
				be the closest point to $y$ in the subspace $W$ spanned by $u_1$ and $u_2$, where 
				$$
				y = \!\begin{bmatrix} 12 \\ -1 \\ 2 \end{bmatrix} \quad , \quad
				u_1 = \!\begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix} \quad , \quad
				u_2 = \!\begin{bmatrix} 2 \\ 1 \\ 2 \end{bmatrix}
				$$
				Find the value for $(i)$, $(ii)$, and $(iii)$.
			</template>
		</MakeProblem>
	</vk>
</template>
