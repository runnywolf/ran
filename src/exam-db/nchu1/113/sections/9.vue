<template>
	<MakeProblem scoreText="(5%)" listEndLabel="b" :listItemScoreTexts="['(2%)','(3%)']">
		<template #problem>
			Please use the concept of Caesar cipher with the formula $y = (x+12) ~\text{mod}~ 26$
			to complete the following requirements. <span class="problem-score">(One word wrong and all wrong)</span>
		</template>
		<template #a>Plaintext “discrete” to ciphertext,</template>
		<template #b>Ciphertext “ymftqymfulq” to plaintext.</template>
	</MakeProblem>
</template>
