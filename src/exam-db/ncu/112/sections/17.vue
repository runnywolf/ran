<template>
	<MakeProblem scoreText="">
		<template #problem>
			Consider the subspace S of $R^4$ spanned by the vectors:
			$$v_1=[1, 1, 1, 1]^T, v_2=[1, 1, 2, 4]^T, v_3=[1, 2, -4, -3]^T.$$
			Apply the Gram-Schmidt method starting from $v_1$, then $v_2$ and finally $v_3$ to obtain the orthogonal basis of S:
			$$u_1=[1, 1, 1, 1]^T, u_2=[-1, a, b, c]^T, u_3=[1, d, e, f]^T,$$
			where $a, b, c, d, e$ and $f$ are all integers (rounded to the nearest ones if necessary). What is mod([a+b+c+d+e+f],5), where mod(.) is the modulo operator?
			A)0 B) 1 C) 2 D) 3 E) 4
		</template>
	</MakeProblem>
</template>
