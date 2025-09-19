<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Given a linear transformation from $\mathbb{R}^2$ to $\mathbb{R}^3$ (with respect to standard bases)
			$L \left( @bm{ x; y } \right) = @bm{ 2x - 2y; 3x - 4y; -7x }$.
			Now let $B_1 = \{ @bm{ 1; 1 } , @bm{ -1; 1 } \}$ and
			$B_2 = \{ @bm{ 1; -1; 0 }, @bm{ 0; 1; 0 }, @bm{ 1; 0; -1 } \}$
			be non‑standard bases for $\mathbb{R}^2$ and $\mathbb{R}^3$, respectively.
			If the matrix representation of the same linear transformation $L$ (with respect to $B_1$ and $B_2$) is
			${ @bm{ a, b; c, d; e, f } }_{B_1 : B_2}$,
			what is $\lfloor ~\! | a + b + c + d + e + f | ~\! \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
