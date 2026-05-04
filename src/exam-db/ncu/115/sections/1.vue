<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $A$ and $B$ be $n \times n$ matrices over $\mathbb{R}$.
			Which of the following statements about determinants are true?
		</template>
		<template #a>If $\det(A) \ne 0$, then the rows of $A$ form a basis of $\mathbb{R}^n$.</template>
		<template #b>For any scalar $c$, $\det(cA) = c\det(A)$.</template>
		<template #c>If $A$ has rank $r < n$, then $\det(A) = 0$.</template>
		<template #d>If $A$ is triangular, then its determinant equals the product of its diagonal entries.</template>
		<template #e>If $AB = BA$, then $\det(A + B) = \det(A) + \det(B)$.</template>
	</MakeProblem>
</template>
