<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $[T_1] = @bm{ 1, -2, 2; 0, 1, 1; 0, 0, 1 },~~$ $[T_2] = @bm{ 1, -3, 4; -1, 1, 1; 1, -2, 5 },~~$
			$[T_3] = @bm{ 1, 4, -3; 2, 7, 1; 1, 1, 3 },$ and $[T_4] = @bm{ 1, 4, -3; 2, 7, 1; 0, 1, 3 }.$
			Which linear operators are one‑to‑one?
		</template>
		<template #a>$T_1$</template>
		<template #b>$T_2$</template>
		<template #c>$T_3$</template>
		<template #d>$T_4$</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
