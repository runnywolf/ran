<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Let $V$ be an inner‑product vector space with inner product $\langle\cdot,\cdot\rangle$.
			Which of the following statements are <span class="ran-bold">correct</span>?
		</template>
		<template #A>
			If $\|u\|=0$ for some $u \in V$, then $u$ does <span class="ran-bold">not</span> have to be the zero vector.
		</template>
		<template #B>
			For any nonzero vectors $u,v\in V$, the angle $\theta$ between them satisfies
			$0\leq\theta\leq\pi$ and is uniquely determined by
			$ \cos\theta = @df{ \sqrt{\langle u,v \rangle} ; \|u\|\|v\| } $.
		</template>
		<template #C>
			An orthonormal basis $\{e_1,\cdots\!,e_k\}$ of $V$ satisfies
			$v=\sum\limits_{i=1}^k\langle v,e_i \rangle e_i$ for every $v \in V$.
		</template>
		<template #D>
			The projection of a vector onto a subspace can be found
			by taking inner products with <span class="ran-bold">any</span> basis of that subspace.
		</template>
		<template #E>
			If two vectors are orthogonal, then their lengths must be equal.
		</template>
	</MakeProblem>
</template>
