<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			The number of non-negative integer solutions of
			<vl exp="x_1 + x_2 + \cdots + x_4 \le 7" /> equals
		</template>
		<template #A>210</template>
		<template #B>330</template>
		<template #C>35</template>
		<template #D>7</template>
		<template #E>120</template>
	</MakeProblem>
</template>
