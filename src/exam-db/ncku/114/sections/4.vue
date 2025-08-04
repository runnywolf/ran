<template>
	<MakeProblem scoreText="(10%)" listEndLabel="d" useSpanList>
		<template #problem>
			Which one is the solution of the recurrence relation $a_n - 3a_{n-1} = 5(3^n)$,
			where $n \ge 1$ and $a_0 = 2$ ?
		</template>
		<template #a>$(1+3n) 3^n$</template>
		<template #b>$(2+4n) 4^n$</template>
		<template #c>$(2+6n) 5^n$</template>
		<template #d>$(2+5n) 3^n$</template>
	</MakeProblem>
</template>
<!-- [fix problem error] "3a_n-1" -> "3a_{n-1}" -->
