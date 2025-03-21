<template>
	<span class="problem-score">(10%)&nbsp;</span>
	<vl exp="
		A =
		\!\begin{bmatrix}
		1   & a   & a^2 & a^3 & \cdots & a^n     \\
		a   & 1   & a   & a^2 & \cdots & a^{n-1} \\
		a^2 & a   & 1   & a   & \cdots & a^{n-2} \\
		a^3 & a^2 & a   & 1   &        & \vdots  \\
		\vdots & \vdots  & \vdots  &         & \ddots & a \\
		a^n    & a^{n-1} & a^{n-2} & \cdots  & a      & 1
		\end{bmatrix}\!
	" />,
	where
	<vl exp="a \in R" />
	and
	<vl exp="n" />
	is a positive integer. Find the product of all the eigenvalues of
	<vl exp="A" />
	in the simplest form.
</template>
