<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			$A = @bm{ 1, 1, 1, 1; -1, 1, 1, 1; 0, 0, 2, 3; 0, 0, 0, 7 }$. Apply QR factorization on $A$ so that $A = QR$,
			where $Q$ is an orthogonal matrix, and $R$ is an upper triangular matrix.
			“$K$” is equal to multiplying all the nonzero elements in $R$. What is $\text{mod}(\text{round}(|K|), 5)$,
			where $\text{round}(\cdot)$ is the rounding function (to the nearest integer),
			and $\text{mod}(\cdot)$ is the modulo operator?
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
