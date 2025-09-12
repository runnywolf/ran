<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Given a linear transformation from $\mathbb{R}^2$ to $\mathbb{R}^3$ (with respect to standard bases)
			<vl class="extra-margin" exp="
			L \left( \!\begin{bmatrix} x \\ y \end{bmatrix}\! \right)
			= \!\begin{bmatrix} 2x - 2y \\ 3x - 4y \\ -7x \end{bmatrix}\!
			" />.
			Now let
			<vl class="extra-margin" exp="
			B_1 = \{ \!\begin{bmatrix} 1 \\ 1 \end{bmatrix}\! , \!\begin{bmatrix} -1 \\ 1 \end{bmatrix} \}
			" />
			and
			<vl class="extra-margin" exp="
			B_2 = \{
			\!\begin{bmatrix} 1 \\ -1 \\ 0 \end{bmatrix}\!,
			\!\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}\!,
			\!\begin{bmatrix} 1 \\ 0 \\ -1 \end{bmatrix}\!
			\}
			" />
			be non‑standard bases for $\mathbb{R}^2$ and $\mathbb{R}^3$, respectively.
			If the matrix representation of the same linear transformation $L$ (with respect to $B_1$ and $B_2$) is
			<vl class="extra-margin" exp="
			{ \!\begin{bmatrix} a & b \\ c & d \\ e & f \end{bmatrix}\! }_{B_1 : B_2}
			" />,
			what is $\lfloor ~\! | a + b + c + d + e + f | ~\! \rfloor \% 5$?
			<span class="ran-no-break">
				($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
			</span>
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>

<style scoped>
.extra-margin {
	line-height: 100px;
}
</style>
