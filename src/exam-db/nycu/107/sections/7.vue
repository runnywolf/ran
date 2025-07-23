<template>
	<vk>
		<MakeProblem scoreText="(5 points)" :optionSlotNames="[ '1', '2', '3' ]" useUlToListOptions>
			<template #problem>
				What is the probability that when a coin is flipped six times in a row,
			</template>
			<template #1>
				it lands heads up every time?
			</template>
			<template #2>
				it lands heads up three times?
			</template>
			<template #3>
				it lands heads up even number of times?
			</template>
		</MakeProblem>
	</vk>
</template>
