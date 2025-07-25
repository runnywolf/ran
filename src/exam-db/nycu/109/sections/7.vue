<template>
	<MakeProblem
		listEndLabel="e"
		:listItemScoreTexts="['[1 point]', '[1 point]', '[1 point]', '[1 point]', '[1 point]']"
	>
		<template #problem>
			Let $E_1,~ E_2,$ and $E_3$ be 3x3 elementary matrices of type I (interchanging two rows of $I$),
			II (multiplying a row of $I$ by a nonzero constant),
			and III (adding a multiple of one row to another row), respectively.
			Also let $A$ be a 3x3 matrix with $\det(A) = 6$.
			Assume, additionally, that $E_2$ was formed from identity matrix by multiplying its second row by 3.
			Find the value of each of the following:
		</template>
		<template #a>$\det(E_1 A)$</template>
		<template #b>$\det(E_2 A)$</template>
		<template #c>$\det(A E_3)$</template>
		<template #d>$\det({E_1}^2)$</template>
		<template #e>$\det(E_3 E_2 E_1)$</template>
	</MakeProblem>
</template>
