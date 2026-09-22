<template>
	<MakeProblem listEndLabel="D">
		<template #problem>
			Suppose $V$ is an inner product space over $F$, $\forall u,v,w \in V$, $\alpha \in F$, which of the
			following inner product property is incorrect?
		</template>
		<template #A>$u \cdot u = 0$ if and only if $u = 0$.</template>
		<template #B>$u \cdot (v + w) = u \cdot v + u \cdot w$</template>
		<template #C>$\lVert \alpha u \rVert = \alpha  \lVert u \rVert$</template>
		<template #D>$(\alpha u) \cdot v = \alpha (u \cdot v) = u (\alpha \cdot v)$</template>
	</MakeProblem>
</template>
<!-- [fix problem error] 問題寫 alpha, 但選項寫 c, 因此把選項統一改成 alpha -->
 