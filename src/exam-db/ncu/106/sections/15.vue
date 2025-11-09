<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $\beta$ and $\gamma$ be the standard ordered bases for $\mathbb{R}^n$ and $\mathbb{R}^m$, respectively.
			For the following transformations: $T: \mathbb{R}^n \to \mathbb{R}^m$,
			choose the option in which $[T]_{\beta}^{\gamma}$ is correct.
		</template>
		<template #a>
			$T: \mathbb{R}^2 \to \mathbb{R}^3$ defined by $T(a_1, a_2) = (2a_1 - a_2,~ 3a_1 + 4a_2,~ a_1)$,
			$[T]_{\beta}^{\gamma} = @pm{ 2, -1; 3, 2; 1, 0 }$.
		</template>
		<template #b>
			$T: \mathbb{R}^3 \to \mathbb{R}^2$ defined by $T(a_1, a_2, a_3) = (2a_1 + 3a_2 - a_3,~ a_1 + a_3)$,
			$[T]_{\beta}^{\gamma} = @pm{ 2, 3, -1; 1, 0, 1 }$.
		</template>
		<template #c>
			$T: \mathbb{R}^3 \to \mathbb{R}$ defined by $T(a_1, a_2, a_3) = 2a_1 + a_2 - 3a_3$,
			$[T]_{\beta}^{\gamma} = @pm{2, 1, -3}$.
		</template>
		<template #d>
			$T: \mathbb{R}^3 \to \mathbb{R}^3$ defined by $T(a_1, a_2, a_3) = (2a_1 + a_3,~ -a_1 + 4a_2 + 5a_3,~ a_1 + a_3)$,
			$[T]_{\beta}^{\gamma} = @pm{ 0, 2, 1; -1, 3, 2; 1, 0, 1 }$.
		</template>
		<template #e>
			$T: \mathbb{R}^n \to \mathbb{R}^n$ defined by $T(a_1, a_2, \cdots\!, a_n) = (a_1, a_1, \cdots\!, a_1)$,
			$ [T]_{\beta}^{\gamma} = @pm{
			1, 0, \cdots, 0;
			1, 0, \cdots, 0;
			\vdots, \vdots, \ddots, \vdots;
			1, 0, \cdots, 0
			}_{n \times n} $
		</template>
	</MakeProblem>
</template>
