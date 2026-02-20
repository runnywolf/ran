<template>
	<MakeProblem scoreText="(5 points)" listEndLabel="4">
		<template #problem>
			The $a_1, a_2, \cdots\!, a_n$ be $n$ column vectors in $\mathbb{R}^n$ and let $A = @bm{ a_1, a_2, \cdots, a_n }$.
		</template>
		<template #1>
			The vectors $a_1, a_2, \cdots\!, a_n$ will be linearly independent if and only if $A$ is singular.
		</template>
		<template #2>The $Ax = 0$ if and only if $x$ is trivial $@bm{ 0, 0, \cdots, 0 }^T$.</template>
		<template #3>The rank of $A$ plus the nullity of $A$ equals $n$.</template>
		<template #4>The rank of $A$ equals the rank of $A^T$.</template>
	</MakeProblem>
</template>
