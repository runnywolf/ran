<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Which of the following vectors compose a basis for the column space of the matrix $A$?
			$$ A = @bm{ 1, 1, 3, 1, 6; 2, -1, 0, 1, -1; -3, 2, 1, -2, 1; 4, 1, 6, 1, 3 }$$
		</template>
		<template #a>$@bm{ 1; 2; -3; 4 }$</template>
		<template #b>$@bm{ 1; -1; 2; 1 }$</template>
		<template #c>$@bm{ 3; 0; 1; 6 }$</template>
		<template #d>$@bm{ 1; 1; -2; 1 }$</template>
		<template #e>$@bm{ 6; -1; 1; 3 }$</template>
	</MakeProblem>
</template>
