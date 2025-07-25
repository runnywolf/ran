<template>
	<vk>
		<MakeProblem scoreText="(10%)" :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e' ]" useUlToListOptions>
			<template #problem>
				Let vectors $x \in \mathbb{R}^n$ be represented as $x = (x_1, x_2, \cdots, x_n)^T$.
				Which of the following sets is a subspace of $\mathbb{R}^n$?
			</template>
			<template #a>
				$\{ x \in \mathbb{R}^n \mid \sum_{i=1}^n x_i^2 = n^2 \}$
			</template>
			<template #b>
				$\{ x \in \mathbb{R}^n \mid x_1 = 1 \}$
			</template>
			<template #c>
				$\{ x \in \mathbb{R}^n \mid \sum_{i=1}^n \alpha_i x_i = \min_i (\alpha_i) \}$
				for some known constants $\alpha_i \in \mathbb{R}$.
			</template>
			<template #d>
				$\{ x \in \mathbb{R}^n \mid x_{2i} = x_{2i-1} ,~ \forall i = 1, \cdots, n/2 \}$,
				where $n$ is assumed to be even in this case.
			</template>
			<template #e>
				$\{ x \in \mathbb{R}^n \mid x_{2i} - x_{2i-1} = 1 ,~ \forall i = 1, \cdots, n/2 \}$,
				where $n$ is assumed to be even in this case.
			</template>
		</MakeProblem>
	</vk>
</template>
