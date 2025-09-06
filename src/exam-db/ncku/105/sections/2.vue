<template>
	<MakeProblem scoreText="(10%)" listEndLabel="e">
		<template #problem>
			For each of the statements that follow, answer true if the statement is always true and false otherwise.
			In the case of a true statement, explain or prove your answer.
			In the case of a false statement, give an example to show that the statement
			is not always true. Assume that all the given matrices are $n \times n$.
		</template>
		<template #a>$\det(AB) = \det(BA)$</template>
		<template #b>$\det(A+B) = \det(A) + \det(B)$</template>
		<template #c>$\det(cA) = c \cdot \det(A)$</template>
		<template #d>$\det((AB)^T) = \det(A) \det(B)$</template>
		<template #e>$\det(A) = \det(B)$ implies $A = B$</template>
	</MakeProblem>
</template>
