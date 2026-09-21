<template>
	<MakeProblem scoreText="(10%)">
		<template #problem>
			We say that a function $f$ is $L$‑smooth relative to another function $g$ for some positive real number
			$L$ over a set $\mathcal{X}$ if the matrix $\nabla^2(Lg-f)(x)$ is positive semidefinite for all
			$x \in \mathcal{X}$. Now, let
			$$f(x) = -\alpha\ln(a_1^T x) - \beta\ln(a_2^T x) ,$$
			where $\alpha$ and $\beta$ are strictly positive real numbers and $a_1$ and $a_2$ are entry‑wise strictly
			positive real $n$‑dimensional vectors. Here, $a^T$ and $b^T$ denote the transposes of $a$ and $b$. Let
			$$g(x) = -\sum_{i=1}^{n}\ln(x[i]),$$
			where $x[i]$ denotes the $i\!$‑th entry of the vector $x$. Then, the smallest possible $L$ such that the
			function $f$ is $L\!$‑smooth relative to $g$ over the set
			$$\{ v \in \mathbb{R}^d \mid v[i] \gt 0 \text{ for all } i,~ v[1]+v[2]+\cdots+v[n]=1 \}$$
			is given by $L=$ ________. Express your answer in terms of $\alpha,~ \beta,~ a_1,~ a_2,~ a_1^T,~ a_2^T$, and numbers.
		</template>
	</MakeProblem>
</template>
