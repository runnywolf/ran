<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			The predicate $G(x, y)$ means student $x$ and $y$ have the same grade.
			What can be the correct English statements for the logic expression
			$$\text{“}~ \exists x, y, \forall z, (x \neq y) \land G(x, y) \land (G(x, z) \to (x = y) \lor (x = z)) ~\text{”}$$
		</template>
		<template #a>Some student has the same grade with exactly one other student.</template>
		<template #b>
			There are two students who have a certain same grade, and all other students do not have that same grade.
		</template>
		<template #c>All students have either one or the other possible grades.</template>
		<template #d>Every student can find exactly other one student that has the same grade.</template>
		<template #e>No student can have the same grade as more than one other student.</template>
	</MakeProblem>
</template>
