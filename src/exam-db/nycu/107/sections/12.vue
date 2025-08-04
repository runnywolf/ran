<template>
	<MakeProblem scoreText="(5 points)" listEndLabel="5">
		<template #problem>
			There are many types of elementary matrices. The properties are described in elementary matrices if
		</template>
		<template #1>
			a $n \times n$ matrix is obtained by interchanging two rows of $I$.
		</template>
		<template #2>
			a $n \times n$ matrix is obtained by multiplying a column of $I$ by a nonzero constant.
		</template>
		<template #3>
			a $n \times n$ matrix is obtained from $I$ by adding a multiple of one row to another row.
		</template>
		<template #4>
			a $n \times n$ permutation matrix is formed from the $I$ by reordering its columns.
		</template>
		<template #5>
			the determinate of $n \times n$ matrix is always 1.
		</template>
	</MakeProblem>
</template>
