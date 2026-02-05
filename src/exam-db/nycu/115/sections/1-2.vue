<template>
	<MakeProblem scoreText="(5 points)" listEndLabel="4">
		<template #problem>
			There are many types of elementary matrices. Which of the following definitions are elementary matrices?
		</template>
		<template #1>A $n \times n$ matrix is obtained by interchanging two rows of $I$.</template>
		<template #2>A $n \times n$ matrix is obtained by multiplying a row of $I$ by a nonzero constant.</template>
		<template #3>A $n \times n$ matrix is obtained from $I$ by adding a multiple of one row to another row.</template>
		<template #4>A $n \times n$ matrix is form from the $I$ by reordering its column.</template>
	</MakeProblem>
</template>
