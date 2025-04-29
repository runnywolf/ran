<template>
	<MultiOption
		:optionNames="['A', 'B', 'C', 'D', 'E']"
		:optionAnswers="[true, false, true, false]"
	>
		<template #A>
			a
		</template>
		<template #C>
			c
		</template>
	</MultiOption>
</template>
