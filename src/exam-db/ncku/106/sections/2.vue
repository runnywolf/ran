<template>
	<MakeProblem scoreText="(10%)" listEndLabel="c">
		<template #problem>
			Let $V$ be the vector space $\mathbb{R}^3$.
			Determine if $U$ is a subspace of $V$ if $U$ contains the following vectors.
		</template>
		<template #a>$U = \{ (x,y,z): x < 0 \}$</template>
		<template #b>$U = \{ (x,y,z): x + y + z = 3 \}$</template>
		<template #c>$U = \{ (x,y,z): x = 2z \}$</template>
	</MakeProblem>
</template>
