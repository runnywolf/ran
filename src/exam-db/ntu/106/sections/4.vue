<template>
	<vk>
		<MakeProblem scoreText="(10%)">
			<template #problem>
				Define function $f : \mathbb{R}^2 \times \mathbb{R}^2 \rightarrow \mathbb{R}$ as
				$$ f(x, y) = x_1y_1 - x_1y_2 - x_2y_1 + 4x_2y_2 ~, $$
				for any vector $x$ (respectively, $y$) with standard coordinate $(x_1, x_2)$
				(respectively, $(y_1, y_2)$). Let
				$$ u = (1, 0) ~. $$
				Find a vector $v$ such that
				$$ f(x, y) = s_1t_1 + s_2t_2 ~, $$
				where $(s_1, s_2)$ (respectively, $(t_1, t_2)$) is the coordinate of $x$
				(respectively, $y$) with respect to the ordered basis of $\mathbb{R}^2$ consisting of $u$ and $v$.
			</template>
		</MakeProblem>
	</vk>
</template>
