<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $A = @bm{ 0, 0, 0, 1; 0, 1, 1, 0; 0, 1, 0, 0; 1, 0, 0, 0 }$ be the matrix to represent
			a binary relation $R$ on a four‑elements set. Which of the following statements is true?
		</template>
		<template #a>The reflexive closure of $R$ is an equivalence relation.</template>
		<template #b>There are eight 1’s in the matrix that represents the symmetric closure of $R$.</template>
		<template #c>The directed graph representation of $R$ is connected.</template>
		<template #d>The directed graph of $R$ does not have a strongly connected component.</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
