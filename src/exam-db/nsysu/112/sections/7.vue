<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #a>
			Find and solve a recurrence relation for the number of ways to park motorcycles and cars
			in a row of $n$ spaces if each cycle requires one space and each car needs three.
		</template>
		<template #b>
			Find and solve a recurrence relation for the number of ways to park motorcycles and cars
			in a row of $n$ spaces if each cycle requires one space, each car needs three,
			and the cars come in four different colors.
		</template>
	</MakeProblem>
</template>
