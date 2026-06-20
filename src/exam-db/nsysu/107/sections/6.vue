<template>
	<MakeProblem listEndLabel="d" :listItemScoreTexts="['[2%]', '[5%]', '[5%]', '[8%]']">
		<template #problem>
			Let $(\mathbb{Z} \times \mathbb{Z}, \oplus)$ be the group with $(a,b) \oplus (c,d) = (a+c+2 ,~ b+d-2)$
			for any $(a,b),(c,d) \in \mathbb{Z} \times \mathbb{Z}$ where $a+c+2$ and $b+d-2$ are computed
			using ordinary addition and subtraction in $\mathbb{Z}$.
		</template>
		<template #a>$3(4,5) = (4,5) \oplus (4,5) \oplus (4,5) = {?}$</template>
		<template #b>What is the identity of the group?</template>
		<template #c>What is the inverse of $(a,b)$?</template>
		<template #d>
			Let $(G,+)$ be an additive group and let $h: \mathbb{Z} \times \mathbb{Z} \to G$
			be a group homomorphism where $h(3,2) = u$ and $h(-2,6) = v$. Please express $h(18,22)$ in terms of $u$ and $v$.
		</template>
	</MakeProblem>
</template>
