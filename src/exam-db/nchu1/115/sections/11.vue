<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $A=@pm{1,2,-1;3,k,4;-2,1,5},~b=@pm{2;-1;3}.$
			Which of the following statements are correct?
		</template>
		<template #A>
			Expanding $\det(A)$ along the first row gives
			$$\det(A)=1@vm{k,4;1,5}-2@vm{3,4;-2,5}-1@vm{3,k;-2,1}.$$
		</template>
		<template #B>
			The system $Ax=b$ has a unique solution whenever $\det(A)=0$.
		</template>
		<template #C>
			Performing a single elementary row operation of the form $R_2 \leftarrow R_2+cR_1$
			does not change the determinant of $A$, regardless of the value of $c$.
		</template>
		<template #D>
			Cramer’s Rule applies exactly when $\text{rank}(A)=3$.
		</template>
		<template #E>
			If $\text{rank}(A)=2$, then $\text{rank}([A|b])$ must also be 2.
		</template>
	</MakeProblem>
</template>
