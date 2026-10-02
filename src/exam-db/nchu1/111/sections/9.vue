<template>
	<MakeProblem listEndLabel="d">
		<template #problem>
			Let $m$ be a positive integer and $a,b,c,d$ be integers with $a\equiv b\pmod m$ and $c\equiv d\pmod m$.
			Which of the following equalities is correct?
		</template>
		<template #a>$a+c\pmod m=b+d\pmod m$</template>
		<template #b>$ac\pmod m=bd\pmod m$</template>
		<template #c>$(a+c)\pmod m=(b\bmod m)+(d\bmod m)$</template>
		<template #d>$ac\pmod m=(b\bmod m)(d\bmod m)$</template>
	</MakeProblem>
</template>
