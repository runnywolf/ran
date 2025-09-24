<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following statements about the matrix $A_{m \times n},~ m \lt n$ are true?
		</template>
		<template #A>
			The sum of its nullity and its rank is $m$.
		</template>
		<template #B>
			If its rank is equal to $m$, then $A A^T$ must be invertible.
		</template>
		<template #C>
			The number of independent columns and the number of independent rows in the matrix $A$ can be different.
		</template>
		<template #D>
			After applying Gaussian elimination on $A$, the number of zero rows must be $m-r$, where $r$ is the rank of $A$.
		</template>
		<template #E>
			None of the above is true.
		</template>
	</MakeProblem>
</template>
