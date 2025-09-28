<template>
	<MakeProblem scoreText="(10%)" listEndLabel="D">
		<template #problem>
			Let $A$ be an $m \times n$ matrix with the rank $r$, which is the relationship between
			$r, m, n$ if $Ax = b$ has exactly one solution for some $b$, no solution for other $b$?
		</template>
		<template #A>$r = m ,~~ r \lt n$</template>
		<template #B>$r \lt m ,~~ $always $r \leq n$</template>
		<template #C>$r \lt m ,~~ r = n$</template>
		<template #D>$r = m = n$</template>
	</MakeProblem>
</template>
