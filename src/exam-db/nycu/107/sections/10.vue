<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2', '3', '4', '5' ]" useUlToListOptions>
			<template #problem>
				A matrix is said to be in reduced row echelon form, if
			</template>
			<template #1>
				the nonzero entry in each nonzero row is 1.
			</template>
			<template #2>
				row $m$ does not consist entirely of zeros, the number of leading zero entries
				in row $m+1$ is greater than the number of leading zero entries in row $m$.
			</template>
			<template #3>
				there are rows whose entries are all zero, they are below the rows having nonzero entries.
			</template>
			<template #4>
				the first nonzero entry in each row is the only nonzero entry in its column.
			</template>
			<template #5>
				its augmented matrix is treated as a homogeneous system.
			</template>
		</MakeProblem>
	</vk>
</template>
