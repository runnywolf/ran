<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Which of the following vectors belong to the nullspace of $A = @bm{ 1, 1, 1, 0; 2, 1, 0, 1 }$?
		</template>
		<template #a>$(0,0,0,0)^T$</template>
		<template #b>$(1,1,1,0)^T$</template>
		<template #c>$(1,-2,1,0)^T$</template>
		<template #d>$(-1,1,0,1)^T$</template>
		<template #e>$(0,-1,1,1)^T$</template>
	</MakeProblem>
</template>
