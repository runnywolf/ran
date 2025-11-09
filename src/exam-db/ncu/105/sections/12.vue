<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Suppose that $A$ is a $5 \times 6$ matrix. Determine which of the following statements are true?
		</template>
		<template #a>The rank of $A$ is at most $5$.</template>
		<template #b>The rank of $A^T$ is at most $5$.</template>
		<template #c>The number of parameters in the general solution of $Ax = 0$ is at most $6$.</template>
		<template #d>The nullity of $A^T$ is at most $6$.</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
