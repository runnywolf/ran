<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #problem>
			A ship carries 60 flags, 15 each of the colors red, white, blue, and black.
			Fifteen of these flags are placed on a vertical pole in order to communicate a signal to other ships.
		</template>
		<template #a>
			How many of these signals use an odd number of black flags and an even number of red flags?
		</template>
		<template #b>
			How many of the signals have at least five white flags or no blue flags at all?
		</template>
	</MakeProblem>
</template>
