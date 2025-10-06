<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			For the 197 by 197 finite difference matrix, $A$, which statements are true?
			$$
			\def\arraystretch{1.3}
			A_{197 \times 197} = @bm{
			2, -1, 0, , , , 0;
			-1, 2, -1, 0, , , ;
			0, -1, 2, -1, 0, , ;
			, \ddots, \ddots, \ddots, \ddots, \ddots, ;
			, , 0, -1, 2, -1, 0;
			, , , 0, -1, 2, -1;
			0, , , , 0, -1, 2
			}
			$$
		</template>
		<template #A>
			The determinant of $A$ is $d$. Then, $\text{mod}(|d|, 5) = 3$, where $\text{mod}(\cdot)$ is the modulo operation.
		</template>
		<template #B>
			$A$ can be expressed as $A = B + C$, where $B$ is a symmetric matrix and $C$ is a skew‑symmetric matrix.
		</template>
		<template #C>
			$A$ can be expressed as $A = B C B^T$, where $B$ is an orthogonal matrix and $C$ is a diagonal matrix.
		</template>
		<template #D>
			$A$ can be expressed as $A = B C B^T$, where $B$ is a lower triangular matrix and $C$ is a diagonal matrix.
		</template>
		<template #E>
			$A\!$’s smallest eigenvalue is negative.
		</template>
	</MakeProblem>
</template>
