<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5%)', '(5%)']">
		<template #problem>
			In how many ways can 36 identical robots be assigned to five assembly lines with
		</template>
		<template #a>
			at least four robots assigned to each line?
		</template>
		<template #b>
			at least four, but no more than ten, assigned to each line?
			<span class="problem-score"><br>(no score if you give no details.)</span>
		</template>
	</MakeProblem>
</template>
