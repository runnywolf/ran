<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[6%]', '[6%]']">
		<template #problem>
			In how many ways can we distributed 10 identical green balls into 5 distinct containers so that
		</template>
		<template #a>no container is left empty?</template>
		<template #b>the third container has an even number of balls in it?</template>
	</MakeProblem>
</template>
