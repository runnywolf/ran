<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(2%)', '(8%)']">
		<template #problem>
			Let $x \in \mathbb{R}^3$ be a zero‑mean random vector representing
			three correlated sensor channels $@pm{x_1, x_2, x_3}^T$.
			Suppose the covariance matrix of $x$ is $$\Sigma=@pm{3,1,0;1,3,0;0,0,2}.$$
			In a signal‑processing pipeline, you want to <span class="ran-bold">whiten</span> the data
			by constructing a linear transformation $W$ such that the transformed vector $y=Wx$
			has identity covariance matrix: $$\text{Cov}(y)=@pm{1,0,0;0,1,0;0,0,1}.$$
		</template>
		<template #a>
			Show that $\Sigma$ is a Hermitian matrix and verify that it
			also satisfies the properties of a covariance matrix.
		</template>
		<template #b>
			Find the whitening matrix $W$.
		</template>
	</MakeProblem>
</template>
