<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="['a', 'b', 'c', 'd', 'e']" useUlToListOptions>
			<template #problem>
				Which of the following statements are true?
			</template>
			<template #a>
				Let $D: V \to V$ be defined by $D(f) = \frac{df}{dt}$, where $V$ is the space of functions
				with basis $\{ \sin t, \cos t \}$. The eigenvalues of $D$ are $\pm 1$.
			</template>
			<template #b>
				$F$ is linear if $F: \mathbb{R}^3 \to \mathbb{R}^2$ is defined by $F(x, y, z) = (x + 1 , y + z)$.
			</template>
			<template #c>
				Assume that $A \in M_{n \times n}(F)$ has two distinct eigenvalues, $\lambda_1$ and $\lambda_2$.
				If $\dim(E_{\lambda_1}) = n - 1$, $A$ is diagonalizable.
			</template>
			<template #d>
				Let $A, B$ and $C$ be three $n \times n$ matrices such that for $k = 1, 2, \cdots \!, n$
				$$
				\begin{alignat*}{1}
				& c_{ik} = a_{ik} + b_{ik}, \text{ for some } i; \\
				& a_{jk} = b_{jk} = c_{jk}, \text{ for } j \neq i.
				\end{alignat*}
				$$
				Then we have $\det C = \det A + \det B$.
			</template>
			<template #e>
				Let $T$ be a diagonalizable linear operator on a finite‑;dimensional vector space,
				and let $m$ be any positive integer. $T$ and $T^m$ are simultaneously diagonalizable.
			</template>
		</MakeProblem>
	</vk>
</template>
